import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { motion } from "framer-motion";

const ProfileNotFound = () => {
  const { username } = useParams();

  useEffect(() => {
    document.title = "Profile Not Found | Pro Bonex";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-block"
          >
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto">
              <UserX className="h-12 w-12 text-muted-foreground" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-3">Profile Not Found</h1>
          <p className="text-muted-foreground mb-2 text-lg">
            No account exists with the handle <span className="font-mono text-foreground">@{username}</span>
          </p>
          <p className="text-muted-foreground mb-8">
            This profile doesn't exist or may have been removed.
          </p>
          
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button size="lg">Go Home</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileNotFound;
