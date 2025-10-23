import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { StateDistrictSelect } from "./StateDistrictSelect";
import { ConstitutionSelect } from "./ConstitutionSelect";
import { UDHRSelect } from "./UDHRSelect";
import { Scale, FileText, MapPin, AlertCircle, Sparkles, Code } from "lucide-react";

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  victimId: string;
  onCaseCreated: () => void;
}

export const NewCaseDialog = ({ open, onOpenChange, victimId, onCaseCreated }: NewCaseDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [constitutionViolations, setConstitutionViolations] = useState<string[]>([]);
  const [udhrViolations, setUdhrViolations] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Distructive Fields - Required
    if (!title || !description || !state || !district) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    // Violations missing - No Case exists  without an actual human rights violation!
    if (constitutionViolations.length === 0 && udhrViolations.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Violations",
        description: "Please select at least one violation from Constitution or UDHR",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("cases")
        .insert({
          victim_id: victimId,
          title,
          description,
          state,
          congressional_district: district,
          constitution_violations: constitutionViolations,
          udhr_violations: udhrViolations,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Case Created",
        description: "Your case has been created. Now find lawyers to help.",
      });

      onCaseCreated();
      onOpenChange(false);
      
      // Go to Lawyer Matching Page
      navigate(`/find-lawyers/${data.id}`);
      
      // Reset form active states - Reset All Fields
      setTitle("");
      setDescription("");
      setState("");
      setDistrict("");
      setConstitutionViolations([]);
      setUdhrViolations([]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not create case",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-primary/20">
        <DialogHeader className="space-y-3 text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          {/* Case Creation - Questionare */}
          <DialogTitle className="text-2xl font-bold">Create New Case</DialogTitle>
          <DialogDescription className="text-base">
            Provide details about your human rights case to connect with pro bono lawyers
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Case Title *
            </Label>
            <Input
              id="title"
              placeholder="Brief title of your case"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-12 border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what happened in detail. Include dates, locations, and any relevant information that would help a lawyer understand your case..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="border-primary/20 focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Location */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Information
            </h3>
            <StateDistrictSelect
              state={state}
              district={district}
              onStateChange={setState}
              onDistrictChange={setDistrict}
            />
          </div>

          {/* Violations */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Human Rights Violations
            </h3>
            <div className="space-y-6">
              <ConstitutionSelect
                selected={constitutionViolations}
                onChange={setConstitutionViolations}
              />

              <UDHRSelect
                selected={udhrViolations}
                onChange={setUdhrViolations}
              />
            </div>
          </div>

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
                  Creating...
                </div>
              ) : (
                "Create Case"
              )}
            </Button>
          </div>

          {/* Developer appreciation */}
          <div className="text-center pt-4 border-t border-primary/10">
            <div className="inline-flex items-center gap-2 text-xs text-primary/60">
              <Code className="w-3 h-3" />
              <span>Built with ❤️ by a student developer</span> {/* Student Creds :) */}
              <Sparkles className="w-3 h-3 animate-pulse" />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
