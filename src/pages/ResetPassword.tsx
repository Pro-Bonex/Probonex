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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Pro Bonex" className="h-20 w-20" />
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                {emailSent 
                  ? "Check your email for reset instructions" 
                  : "Enter your email to receive password reset instructions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRecovery ? (
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              ) : (
                <>
                  {!emailSent ? (
                    <form onSubmit={handleReset} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground">
                        We've sent a password reset link to your email. Please check your inbox and follow the instructions.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setEmailSent(false)}
                      >
                        Send Another Email
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link to="/login" className="text-primary font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <p className="text-center mt-6 text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
