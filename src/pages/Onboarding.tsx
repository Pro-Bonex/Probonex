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
import { Scale, Heart } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              {step === 1 ? "Tell us about yourself" : "Add your details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>I am a...</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as "lawyer" | "victim")}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="lawyer" id="lawyer" />
                      <Label htmlFor="lawyer" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Scale className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Pro Bono Lawyer</div>
                          <div className="text-sm text-muted-foreground">I want to offer legal assistance</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="victim" id="victim" />
                      <Label htmlFor="victim" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Heart className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Human Rights Victim</div>
                          <div className="text-sm text-muted-foreground">I need legal assistance</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {role === "lawyer" && (
                  <StateDistrictSelect
                    state={state}
                    district={district}
                    onStateChange={setState}
                    onDistrictChange={setDistrict}
                  />
                )}

                <Button 
                  onClick={handleRoleSubmit} 
                  className="w-full" 
                  disabled={!role || (role === "lawyer" && (!state || !district))}
                >
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                {role === "lawyer" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Contact Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="contact@example.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="pronouns">Pronouns (Optional)</Label>
                  <Input
                    id="pronouns"
                    placeholder="she/her, he/him, they/them"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                  />
                </div>

                {role === "lawyer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bio">
                        Bio * (50-300 characters)
                        <span className="text-muted-foreground text-sm ml-2">
                          {bio.length}/300
                        </span>
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about your experience and expertise..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <ConstitutionSelect
                      selected={constitutionViolations}
                      onChange={setConstitutionViolations}
                    />

                    <UDHRSelect
                      selected={udhrViolations}
                      onChange={setUdhrViolations}
                    />
                  </>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleProfileSubmit} className="flex-1" disabled={loading}>
                    {loading ? "Creating Profile..." : "Complete Profile"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;