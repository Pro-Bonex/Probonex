import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, MapPin, Phone, Mail, Globe, Sparkles, Code, Edit } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
  onProfileUpdated: () => void;
}

export const EditProfileDialog = ({ open, onOpenChange, profile, onProfileUpdated }: EditProfileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [bio, setBio] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setPhoneNumber(profile.phone_number || "");
      setContactEmail(profile.contact_email || "");
      setWebsite(profile.website || "");
      setPronouns(profile.pronouns || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !city || !state) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (profile.role === "lawyer" && bio && (bio.length < 50 || bio.length > 300)) {
      toast({
        variant: "destructive",
        title: "Bio Length Error",
        description: "Bio must be between 50 and 300 characters",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          city,
          state,
          phone_number: phoneNumber || null,
          contact_email: contactEmail || null,
          website: website || null,
          pronouns: pronouns || null,
          bio: bio || null,
        })
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });

      onProfileUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-primary/20">
        <DialogHeader className="space-y-3 text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
            <Edit className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription className="text-base">
            Update your profile information to keep it current and accurate
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pronouns" className="text-sm font-medium">Pronouns</Label>
                <Input
                  id="pronouns"
                  placeholder="she/her, he/him, they/them"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Contact Information (Lawyers only) */}
          {profile?.role === "lawyer" && (
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bio (Lawyers only) */}
          {profile?.role === "lawyer" && (
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Professional Bio
              </h3>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio (50-300 characters)
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
                  className="border-primary/20 focus:border-primary/40 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1 h-12 border-primary/20 hover:border-primary/40 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

          {/* Developer appreciation */}
          <div className="text-center pt-4 border-t border-primary/10">
            <div className="inline-flex items-center gap-2 text-xs text-primary/60">
              <Code className="w-3 h-3" />
              <span>Built with ❤️ by a student developer</span>
              <Sparkles className="w-3 h-3 animate-pulse" />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};