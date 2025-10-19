import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Scale, Heart, ArrowRight, ArrowLeft, User, Sparkles, Code, CheckCircle } from "lucide-react";
import { StateDistrictSelect } from "@/components/StateDistrictSelect";
import { ConstitutionSelect } from "@/components/ConstitutionSelect";
import { UDHRSelect } from "@/components/UDHRSelect";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form data
  const [role, setRole] = useState<"lawyer" | "victim" | "">("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [bio, setBio] = useState("");
  const [constitutionViolations, setConstitutionViolations] = useState<string[]>([]);
  const [udhrViolations, setUdhrViolations] = useState<string[]>([]);

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      } else {
        setUserId(session.user.id);
        setUsername(session.user.user_metadata.username || "");
        setContactEmail(session.user.email || "");
      }
    });
  }, [navigate]);

  const handleRoleSubmit = () => {
    if (!role) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select your role.",
      });
      return;
    }
    
    // Lawyers need location, victims don't
    if (role === "lawyer" && (!state || !district)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select your state and congressional district.",
      });
      return;
    }
    
    setStep(2);
  };

  const handleProfileSubmit = async () => {
    if (!fullName) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in your full name.",
      });
      return;
    }

    if (role === "lawyer") {
      if (!phoneNumber || !contactEmail || bio.length < 50) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields. Bio must be at least 50 characters.",
        });
        return;
      }
      
      if (bio.length > 300) {
        toast({
          variant: "destructive",
          title: "Bio Too Long",
          description: "Bio must be 300 characters or less.",
        });
        return;
      }
      
      if (constitutionViolations.length === 0 && udhrViolations.length === 0) {
        toast({
          variant: "destructive",
          title: "Missing Specialties",
          description: "Please select at least one violation specialty.",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Update profile
      const profileData: any = {
        full_name: fullName,
        role: role as "lawyer" | "victim",
        phone_number: phoneNumber || null,
        contact_email: contactEmail || null,
        website: website || null,
        pronouns: pronouns || null,
        bio: bio || null,
      };

      // Lawyers have location and specialties, victims don't
      if (role === "lawyer") {
        profileData.state = state;
        profileData.city = state; // Using state code as placeholder for city
        profileData.congressional_district = district;
        profileData.specialties_constitution = constitutionViolations;
        profileData.specialties_udhr = udhrViolations;
      } else {
        profileData.state = "";
        profileData.city = "";
        profileData.congressional_district = null;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId);

      if (profileError) throw profileError;

      // If the user selected a different role than the default 'victim', update user_roles
      if (role === "lawyer") {
        // Delete the default 'victim' role
        await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "victim");
        
        // Insert the 'lawyer' role
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: userId,
          role: "lawyer",
        });

        if (roleError) throw roleError;
      }

      toast({
        title: "Profile Created",
        description: "Welcome to Pro Bonex!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not create profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <div className={`h-1 w-16 rounded-full transition-all duration-300 ${
                step >= 2 ? 'bg-primary' : 'bg-muted'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {step} of 2: {step === 1 ? 'Choose Your Role' : 'Complete Your Profile'}
              </p>
            </div>
          </div>

          {/* Enhanced onboarding card */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="space-y-3 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
                {step === 1 ? <User className="h-6 w-6 text-primary" /> : <Scale className="h-6 w-6 text-primary" />}
              </div>
              <CardTitle className="text-2xl font-bold">Welcome to Pro Bonex</CardTitle>
              <CardDescription className="text-base">
                {step === 1 ? "Tell us about yourself to get started" : "Add your details to complete your profile"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Label className="text-lg font-semibold">I am a...</Label>
                    <RadioGroup value={role} onValueChange={(value) => setRole(value as "lawyer" | "victim")}>
                      <div className="group flex items-center space-x-3 p-6 border border-primary/10 rounded-2xl cursor-pointer hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <RadioGroupItem value="lawyer" id="lawyer" />
                        <Label htmlFor="lawyer" className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Scale className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">Pro Bono Lawyer</div>
                            <div className="text-sm text-muted-foreground">I want to offer legal assistance to those in need</div>
                          </div>
                        </Label>
                      </div>
                      <div className="group flex items-center space-x-3 p-6 border border-primary/10 rounded-2xl cursor-pointer hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <RadioGroupItem value="victim" id="victim" />
                        <Label htmlFor="victim" className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Heart className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">Human Rights Victim</div>
                            <div className="text-sm text-muted-foreground">I need legal assistance for my case</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {role === "lawyer" && (
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        Location Information
                      </h3>
                      <StateDistrictSelect
                        state={state}
                        district={district}
                        onStateChange={setState}
                        onDistrictChange={setDistrict}
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleRoleSubmit} 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
                    disabled={!role || (role === "lawyer" && (!state || !district))}
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>

                  {role === "lawyer" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Contact Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contact@example.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                            className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-medium">Website (Optional)</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="pronouns" className="text-sm font-medium">Pronouns (Optional)</Label>
                    <Input
                      id="pronouns"
                      placeholder="she/her, he/him, they/them"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>

                  {role === "lawyer" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          Bio * (50-300 characters)
                          <span className="text-muted-foreground text-sm ml-2">
                            {bio.length}/300
                          </span>
                        </Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about your experience and expertise in human rights law..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={4}
                          required
                          className="border-primary/20 focus:border-primary/40 transition-colors"
                        />
                      </div>

                      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                        <ConstitutionSelect
                          selected={constitutionViolations}
                          onChange={setConstitutionViolations}
                        />
                      </div>

                      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                        <UDHRSelect
                          selected={udhrViolations}
                          onChange={setUdhrViolations}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)} 
                      className="flex-1 h-12 border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      onClick={handleProfileSubmit} 
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Profile...
                        </div>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Developer appreciation */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-primary/60">
              <Code className="w-3 h-3" />
              <span>Built with ❤️ by a student developer</span>
              <Sparkles className="w-3 h-3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;