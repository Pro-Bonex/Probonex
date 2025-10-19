import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, MapPin, Globe, Mail, Phone, Edit, Award, Users, CheckSquare, Sparkles, Code, Star } from "lucide-react";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { motion } from "framer-motion";
import ProfileNotFound from "./ProfileNotFound";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [pastCases, setPastCases] = useState<any[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadProfile();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, [username]);

  const loadProfile = async () => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (!profileData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setProfile(profileData);

    // Check if it's the user's own profile
    const { data: { session } } = await supabase.auth.getSession();
    setIsOwnProfile(session?.user.id === profileData.id);

    // Load past cases for lawyers
    if (profileData.role === "lawyer") {
      const { data: cases } = await supabase
        .from("past_cases")
        .select("*")
        .eq("lawyer_id", profileData.id)
        .order("date_completed", { ascending: false });

      setPastCases(cases || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
        />
      </div>
    );
  }

  if (notFound) {
    return <ProfileNotFound />;
  }

  const initials = profile?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || '?';

  const uniqueClientsCount = pastCases.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                    <Avatar className="h-32 w-32 relative">
                      <AvatarImage src={profile?.profile_picture_url} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {isOwnProfile && (
                    <Button 
                      onClick={() => setShowEdit(true)} 
                      className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{profile?.full_name}</h1>
                        {profile?.role === "lawyer" && (
                          <Badge variant="default" className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
                            <Scale className="h-3 w-3 mr-1" />
                            Pro Bono Lawyer
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-lg">@{profile?.username}</p>
                      {profile?.pronouns && (
                        <p className="text-sm text-muted-foreground mt-1">({profile.pronouns})</p>
                      )}
                    </div>
                  </div>

                  {profile?.bio && (
                    <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
                      <p className="text-foreground leading-relaxed">{profile.bio}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{profile?.city}, {profile?.state}</span>
                    </div>

                    {profile?.role === "lawyer" && (
                      <>
                        {profile?.phone_number && (
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Phone className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{profile.phone_number}</span>
                          </div>
                        )}
                        {profile?.contact_email && (
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{profile.contact_email}</span>
                          </div>
                        )}
                        {profile?.website && (
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Globe className="h-4 w-4 text-primary" />
                            </div>
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">
                              {profile.website}
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Lawyer Statistics */}
              {profile?.role === "lawyer" && (
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                              <Award className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-3xl font-bold text-primary">{profile.successfully_closed_count || 0}</p>
                              <p className="text-sm text-muted-foreground font-medium">Cases Completed</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                              <Users className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-3xl font-bold text-primary">{uniqueClientsCount}</p>
                              <p className="text-sm text-muted-foreground font-medium">Unique Clients</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Violation Coverage */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mb-6">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                            <CheckSquare className="h-5 w-5 text-primary" />
                          </div>
                          Areas of Expertise
                        </h3>
                        
                        {profile.specialties_constitution && profile.specialties_constitution.length > 0 && (
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Constitutional Rights
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {profile.specialties_constitution.map((violation: string) => (
                                <div key={violation} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <CheckSquare className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="text-sm font-medium">{violation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile.specialties_udhr && profile.specialties_udhr.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Universal Declaration of Human Rights
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {profile.specialties_udhr.map((violation: string) => (
                                <div key={violation} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <CheckSquare className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="text-sm font-medium">{violation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Past Cases */}
                  {pastCases.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        Experience & Past Cases
                      </h2>
                      <div className="grid gap-4">
                        {pastCases.map((caseItem) => (
                          <Card key={caseItem.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-lg">{caseItem.victim_name}</p>
                                  <p className="text-sm text-muted-foreground mb-2">Location: {caseItem.location}</p>
                                  {caseItem.case_description && (
                                    <p className="text-sm mt-2 leading-relaxed">{caseItem.case_description}</p>
                                  )}
                                  <div className="flex gap-2 mt-3">
                                    {caseItem.outcome && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{caseItem.outcome}</Badge>}
                                  </div>
                                </div>
                                {caseItem.date_completed && (
                                  <Badge variant="outline" className="border-primary/20">{new Date(caseItem.date_completed).getFullYear()}</Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          </motion.div>

          {/* Developer appreciation */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-primary/60">
              <Code className="w-3 h-3" />
              <span>Built with ❤️ by a student developer</span>
              <Sparkles className="w-3 h-3 animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {isOwnProfile && (
        <EditProfileDialog
          open={showEdit}
          onOpenChange={setShowEdit}
          profile={profile}
          onProfileUpdated={loadProfile}
        />
      )}
    </div>
  );
};

export default Profile;