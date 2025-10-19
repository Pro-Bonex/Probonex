import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import logo from "@/assets/icon.png";
import { z } from "zod";
import { Scale, ArrowLeft, Sparkles, Code, KeyRound, Mail } from "lucide-react";

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      if (params.get('type') === 'recovery') {
        setIsRecovery(true);
      }
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      resetSchema.parse({ email });
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });

      setEmailSent(true);
      setEmail("");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Could not send reset email. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      passwordSchema.parse({ newPassword, confirmPassword });
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password Updated", description: "You can now sign in with your new password." });
      navigate("/login");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({ variant: "destructive", title: "Validation Error", description: error.errors[0].message });
      } else {
        toast({ variant: "destructive", title: "Error", description: error.message || "Could not update password." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Enhanced logo section */}
          <div className="text-center mb-8">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                <img src={logo} alt="Pro Bonex" className="h-16 w-16 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <Scale className="h-5 w-5" />
                  <span>Pro Bonex</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-primary/60">
                  <Code className="w-3 h-3" />
                  <span>Student Project</span>
                  <Sparkles className="w-3 h-3 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced reset password card */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="space-y-3 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
                {isRecovery ? <KeyRound className="h-6 w-6 text-primary" /> : <Mail className="h-6 w-6 text-primary" />}
              </div>
              <CardTitle className="text-2xl font-bold">
                {isRecovery ? "Set New Password" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-base">
                {emailSent 
                  ? "Check your email for reset instructions" 
                  : isRecovery 
                    ? "Enter your new password below"
                    : "Enter your email to receive password reset instructions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRecovery ? (
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              ) : (
                <>
                  {!emailSent ? (
                    <form onSubmit={handleReset} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                        <Mail className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We've sent a password reset link to your email. Please check your inbox and follow the instructions.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-primary/20 hover:border-primary/40 transition-colors"
                        onClick={() => setEmailSent(false)}
                      >
                        Send Another Email
                      </Button>
                    </div>
                  )}

                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link to="/login" className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Enhanced back link */}
          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
