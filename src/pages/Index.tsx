import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, Users, Shield, CheckCircle, ArrowRight, Heart } from "lucide-react";
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
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3"></div>
                  <div className="relative bg-card border rounded-lg p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <Scale className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                      <div className="h-3 bg-muted rounded w-4/6"></div>
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Connect with the right people</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Find and connect with pro bono lawyers or victims seeking justice in your area. Our smart matching algorithm ensures you find the perfect match.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="group bg-card border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Build your professional presence</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Showcase your experience, cases, and commitment to human rights advocacy. Build trust and credibility in the legal community.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="group bg-card border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Manage cases effectively</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Track open cases, review past work, and coordinate with clients seamlessly. Streamline your pro bono practice.</p>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" onClick={() => navigate("/about")}>
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Lawyers Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">For Pro Bono Lawyers</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Connect with clients who need your expertise in human rights law</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Build a portfolio showcasing your pro bono work and case outcomes</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Manage case requests and track your impact in the community</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Join a network of dedicated human rights advocates</span>
                  </li>
                </ul>
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Join as a Lawyer
                </Button>
              </div>
              <div className="bg-card border rounded-lg p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Scale className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Sarah Johnson, Esq.</h3>
                    <p className="text-sm text-muted-foreground mb-2">Human Rights Attorney • New York, NY</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Scale className="w-4 h-4" />
                      <span>Verified Lawyer</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">Dedicated to protecting human rights and ensuring justice for all. 15+ years of experience in civil rights litigation and advocacy.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cases Completed</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-primary">47</div>
                      <span className="text-sm text-muted-foreground">successful outcomes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Victims Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-card border rounded-lg p-8 shadow-lg">
                <h3 className="font-semibold text-xl mb-6">Find the right lawyer for your case</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Scale className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Civil Rights Attorney</h4>
                        <p className="text-sm text-muted-foreground mb-2">Experienced in constitutional rights violations</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Boston, MA</span>
                          <span>•</span>
                          <span>32 cases</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Scale className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Employment Rights Lawyer</h4>
                        <p className="text-sm text-muted-foreground mb-2">Specializing in workplace discrimination</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Chicago, IL</span>
                          <span>•</span>
                          <span>28 cases</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6">For Those Seeking Justice</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Connect with experienced pro bono lawyers who can help with your case</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Search by location and area of expertise to find the right match</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Document your case details and connect with up to 5 lawyers at once</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Free to use - all legal services provided pro bono</span>
                  </li>
                </ul>
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
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
                <Button size="lg" variant="outline" onClick={() => navigate("/about")} className="text-lg px-8 h-14 border-white/30 text-white hover:bg-white/10 font-semibold">
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