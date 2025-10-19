import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, MapPin, Globe, Mail, Phone, Edit, Award, Users, CheckSquare } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
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
      
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile?.profile_picture_url} />
                    <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isOwnProfile && (
                    <Button onClick={() => setShowEdit(true)} className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-bold">{profile?.full_name}</h1>
                        {profile?.role === "lawyer" && (
                          <Badge variant="default" className="bg-gold text-white">
                            <Scale className="h-3 w-3 mr-1" />
                            Lawyer
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">@{profile?.username}</p>
                      {profile?.pronouns && (
                        <p className="text-sm text-muted-foreground mt-1">({profile.pronouns})</p>
                      )}
                    </div>
                  </div>

                  {profile?.bio && (
                    <p className="text-foreground mb-4">{profile.bio}</p>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{profile?.city}, {profile?.state}</span>
                    </div>

                    {profile?.role === "lawyer" && (
                      <>
                        {profile?.phone_number && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{profile.phone_number}</span>
                          </div>
                        )}
                        {profile?.contact_email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{profile.contact_email}</span>
                          </div>
                        )}
                        {profile?.website && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
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
                <div className="mt-8 pt-8 border-t">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Card className="border-primary/20">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Award className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-3xl font-bold">{profile.successfully_closed_count || 0}</p>
                              <p className="text-sm text-muted-foreground">Cases Completed</p>
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
                      <Card className="border-primary/20">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Users className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-3xl font-bold">{uniqueClientsCount}</p>
                              <p className="text-sm text-muted-foreground">Unique Clients</p>
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
                    <Card className="border-primary/20 mb-6">
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CheckSquare className="h-5 w-5 text-primary" />
                          Areas of Expertise
                        </h3>
                        
                        {profile.specialties_constitution && profile.specialties_constitution.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Constitutional Rights</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {profile.specialties_constitution.map((violation: string) => (
                                <div key={violation} className="flex items-center gap-2">
                                  <CheckSquare className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{violation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile.specialties_udhr && profile.specialties_udhr.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Universal Declaration of Human Rights</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {profile.specialties_udhr.map((violation: string) => (
                                <div key={violation} className="flex items-center gap-2">
                                  <CheckSquare className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{violation}</span>
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
                      <h2 className="text-xl font-semibold mb-4">Experience & Past Cases</h2>
                      <div className="grid gap-4">
                        {pastCases.map((caseItem) => (
                          <Card key={caseItem.id} className="border">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold">Client: {caseItem.victim_name}</p>
                                  <p className="text-sm text-muted-foreground">Location: {caseItem.location}</p>
                                  {caseItem.case_description && (
                                    <p className="text-sm mt-2">{caseItem.case_description}</p>
                                  )}
                                  <div className="flex gap-2 mt-2">
                                    {caseItem.outcome && <Badge variant="secondary">{caseItem.outcome}</Badge>}
                                  </div>
                                </div>
                                {caseItem.date_completed && (
                                  <Badge variant="secondary">{new Date(caseItem.date_completed).getFullYear()}</Badge>
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