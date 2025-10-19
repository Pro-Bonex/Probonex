import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Sparkles, Code, Scale } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Pro Bonex";
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <Header />
      
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardContent className="pt-12 pb-12 px-8 text-center">
              {/* 404 Icon */}
              <div className="mb-8">
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Search className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-4 mb-8">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Oops! The page <code className="bg-primary/10 px-2 py-1 rounded text-primary font-mono">"{location.pathname}"</code> doesn't exist.
                </p>
                <p className="text-muted-foreground">
                  Don't worry, even the best lawyers sometimes take a wrong turn. Let's get you back on track!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto h-12 text-base font-semibold border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <Scale className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Quick Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link 
                    to="/about" 
                    className="flex items-center gap-2 p-3 bg-card/50 rounded-lg hover:bg-primary/10 transition-colors text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 text-primary" />
                    About Pro Bonex
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex items-center gap-2 p-3 bg-card/50 rounded-lg hover:bg-primary/10 transition-colors text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 text-primary" />
                    Join Our Platform
                  </Link>
                </div>
              </div>

              {/* Developer appreciation */}
              <div className="mt-8 pt-6 border-t border-primary/10">
                <div className="inline-flex items-center gap-2 text-xs text-primary/60">
                  <Code className="w-3 h-3" />
                  <span>Built with ❤️ by a student developer</span>
                  <Sparkles className="w-3 h-3 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
