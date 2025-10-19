import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LawyerDashboard } from "@/components/dashboards/LawyerDashboard";
import { VictimDashboard } from "@/components/dashboards/VictimDashboard";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || !data || !data.full_name) {
        // Profile doesn't exist or is incomplete
        navigate("/onboarding");
      } else {
        setProfile(data);
      }
      
      setLoading(false);
    }

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated />
      <main className="flex-1">
        {profile?.role === "lawyer" ? (
          <LawyerDashboard profile={profile} />
        ) : (
          <VictimDashboard profile={profile} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;