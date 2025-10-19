import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, Users, Shield, CheckCircle, ArrowRight } from "lucide-react";
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
        {/* Hero Section - LinkedIn Style */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-16 pb-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Welcome to your professional community
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Connecting pro bono human rights lawyers with victims who need justice. Build your network, showcase your experience, and make a real difference.
                </p>
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


        {/* Features Section - LinkedIn Card Style */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">Explore what you can do on Pro Bonex</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Connect, collaborate, and create change</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect with the right people</h3>
                <p className="text-muted-foreground mb-4">Find and connect with pro bono lawyers or victims seeking justice in your area.</p>
                <Button variant="link" className="p-0 h-auto font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Build your professional presence</h3>
                <p className="text-muted-foreground mb-4">Showcase your experience, cases, and commitment to human rights advocacy.</p>
                <Button variant="link" className="p-0 h-auto font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Manage cases effectively</h3>
                <p className="text-muted-foreground mb-4">Track open cases, review past work, and coordinate with clients seamlessly.</p>
                <Button variant="link" className="p-0 h-auto font-semibold">
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

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Join Pro Bonex today</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of a community dedicated to human rights and equal access to justice
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate("/signup")} className="text-lg px-8 h-12">
              Sign up - it's free
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;