import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Pro Bonex";
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <section className="text-center p-8">
          <h1 className="text-5xl font-bold mb-2">404 - Page not found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the page "{location.pathname}".</p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
