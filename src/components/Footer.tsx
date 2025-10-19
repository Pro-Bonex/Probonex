import { Link } from "react-router-dom";
import logo from "@/assets/icon.png";

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Pro Bonex" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary">Pro Bonex</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              Connecting pro bono human rights lawyers with victims who need legal assistance.
              Access to justice for all.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>About Pro Bonex:</strong> A student-led open source project created for the 2025 Congressional App Challenge by a student in the 5th Congressional District of New Jersey. 
              <a href="https://github.com/Pro-Bonex/Probonex" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">View on GitHub</a>
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
          
          <div>
            <h3 className="font-semibold mb-3">Additional</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><a href="https://github.com/Pro-Bonex/Probonex" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://github.com/Pro-Bonex/Probonex/discussions" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">GitHub Discussions</a></li>
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