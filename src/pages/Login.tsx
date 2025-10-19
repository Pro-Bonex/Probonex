import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import logo from "@/assets/icon.png";
import { z } from "zod";
import { Scale, ArrowLeft, Sparkles, Code } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  // Check for email verification success
  useEffect(() => {
    const checkEmailVerification = async () => {
      // Check if we have URL parameters indicating email verification
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');
      
      // If we have tokens and type is 'email', it means verification was successful
      if (accessToken && refreshToken && type === 'email') {
        try {
          // Set the session with the tokens from URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (!error && data.session) {
            // Show success notification
            toast({
              variant: "success",
              title: "Email Verified Successfully!",
              description: "Your email has been successfully verified. You can now sign in.",
            });

            // Clean up URL parameters
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('access_token');
            newUrl.searchParams.delete('refresh_token');
            newUrl.searchParams.delete('type');
            window.history.replaceState({}, '', newUrl.toString());
          }
        } catch (error) {
          console.error('Error setting session from verification:', error);
        }
      }
    };

    checkEmailVerification();
  }, [searchParams, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      loginSchema.parse({ email, password });
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .maybeSingle();

        if (!profile) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
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
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please try again.",
        });
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

          {/* Enhanced login card */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="space-y-3 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-base">Sign in to continue your journey toward justice</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link 
                      to="/reset-password" 
                      className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors">
                    Sign up now
                  </Link>
                </p>
              </div>
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

export default Login;
