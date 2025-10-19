import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, Users, Shield, CheckCircle, ArrowRight, Heart, Sparkles, Code, Zap, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-1">
        {/* Hero Section - Enhanced */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-20 pb-32 px-4 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto max-w-6xl relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                    <Scale className="h-4 w-4" />
                    Congressional App Challenge 2025
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                    Justice for <span className="text-primary">Everyone</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    Connecting pro bono human rights lawyers with victims who need justice. Build your network, showcase your experience, and make a real difference in people's lives.
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Student-Led Open Source Project</p>
                      <p className="text-xs text-muted-foreground">5th Congressional District of New Jersey</p>
                    </div>
                  </div>
                  <a href="https://github.com/Pro-Bonex/Probonex" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm" target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {isAuthenticated ? (
                    <Button size="lg" onClick={() => navigate("/dashboard")} className="text-lg px-8 h-12">
                      Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8 h-12">
                        Join now
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="text-lg px-8 h-12">
                        Sign in
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative group">
                  {/* Floating background elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:-translate-y-2">
                    {/* Header with animated icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                        <Scale className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gradient-to-r from-primary/60 to-primary/40 rounded-full w-32 animate-pulse"></div>
                        <div className="h-3 bg-gradient-to-r from-muted to-muted/60 rounded-full w-24"></div>
                      </div>
                    </div>
                    
                    {/* Animated content */}
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-primary/40 to-transparent rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-primary/30 to-transparent rounded-full w-5/6 animate-pulse delay-100"></div>
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-transparent rounded-full w-4/6 animate-pulse delay-200"></div>
                    </div>
                    
                    {/* Developer appreciation element */}
                    <div className="mt-6 pt-4 border-t border-primary/10">
                      <div className="flex items-center gap-2 text-xs text-primary/60">
                        <Code className="w-3 h-3" />
                        <span>Built with ❤️ by a student developer</span>
                        <Sparkles className="w-3 h-3 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section - Enhanced */}
        <section className="py-24 px-4 bg-background relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                <Users className="h-4 w-4" />
                Platform Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to make a difference</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Connect, collaborate, and create change with our comprehensive platform designed for human rights advocacy</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-card border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Connect with the right people</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Find and connect with pro bono lawyers or victims seeking justice in your area. Our smart matching algorithm ensures you find the perfect match.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform duration-200" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="group bg-card border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Build your professional presence</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Showcase your experience, cases, and commitment to human rights advocacy. Build trust and credibility in the legal community.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform duration-200" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="group bg-card border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Manage cases effectively</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Track open cases, review past work, and coordinate with clients seamlessly. Streamline your pro bono practice.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform duration-200" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto max-w-6xl relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                <Zap className="h-4 w-4" />
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple steps to justice</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Our platform makes it easy to connect those who need help with those who can provide it</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-muted-foreground">Sign up as a lawyer or victim and tell us about your needs or expertise</p>
              </div>
              
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Scale className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
                <p className="text-muted-foreground">Our algorithm connects you with the right people based on location and expertise</p>
              </div>
              
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Help</h3>
                <p className="text-muted-foreground">Start working together to achieve justice and make a real difference</p>
              </div>
            </div>
            
            {/* Developer appreciation section */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Built with Developer Love</h3>
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This platform was crafted by a student developer who believes technology can bridge the gap between those who need help and those who can provide it. Every line of code was written with the hope of making justice more accessible.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-primary/60">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>Open Source</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>Made with ❤️</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span>Student Project</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white font-medium text-sm">
                  <Heart className="h-4 w-4" />
                  Join the Movement
                </div>
                <h2 className="text-4xl md:text-6xl font-bold">Ready to make a difference?</h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                  Be part of a community dedicated to human rights and equal access to justice. Together, we can create a more just world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" onClick={() => navigate("/signup")} className="text-lg px-8 h-14 bg-white text-primary hover:bg-white/90 font-semibold">
                  Get Started - It's Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/about")} className="text-lg px-8 h-14 border-white/30 text-white hover:bg-white/10 font-semibold bg-transparent">
                  Learn More
                </Button>
              </div>
              
              <div className="pt-8 border-t border-white/20">
                <p className="text-sm opacity-75">
                  Built by a student in the 5th Congressional District of New Jersey for the 2025 Congressional App Challenge
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;