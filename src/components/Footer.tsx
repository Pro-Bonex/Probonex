import { Link } from "react-router-dom";
import logo from "@/assets/icon.png";

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Pro Bonex" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary">Pro Bonex</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Connecting pro bono human rights lawyers with victims who need legal assistance.
              Access to justice for all.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pro Bonex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};