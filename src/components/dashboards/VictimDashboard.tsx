// NOTE: REFER TO LAWYER DASHBOARD FOR MORE COMMENTS ON LOGIC, AND STRUCTURE. BOTH DASHBOARDS ARE SIMILAR APART FROM THEIR UI COMPONENTS.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, FileText, Users, CheckCircle, UserCircle, Mail, Trash2 } from "lucide-react";
import { NewCaseDialog } from "@/components/NewCaseDialog";
import { ContactInfoModal } from "@/components/ContactInfoModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VictimDashboardProps {
  profile: any;
}

export const VictimDashboard = ({ profile }: VictimDashboardProps) => {
  const [openCases, setOpenCases] = useState<any[]>([]);
  const [pastLawyers, setPastLawyers] = useState<any[]>([]);
  const [showNewCase, setShowNewCase] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ email?: string | null; phone?: string | null; name: string } | null>(null);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, [profile.id]);

  const loadDashboardData = async () => {
    // Load open and pending_closure cases
    const { data: cases } = await supabase
      .from("cases")
      .select(`
        *,
        profiles:assigned_lawyer_id (full_name, username, city, state)
      `)
      .eq("victim_id", profile.id)
      .in("status", ["open", "pending_closure"]);

    setOpenCases(cases || []);

    // Load successfully closed cases
    const { data: closed } = await supabase
      .from("cases")
      .select(`
        *,
        profiles:assigned_lawyer_id (full_name, username, city, state)
      `)
      .eq("victim_id", profile.id)
      .eq("status", "successfully_closed");

    setPastLawyers(closed || []);
  };

  const handleInitiateSuccessfulClosure = async (caseId: string, lawyerId: string) => {
    const { error } = await supabase
      .from("cases")
      .update({ 
        status: "pending_closure", 
        closure_initiated_by: profile.id 
      })
      .eq("id", caseId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not initiate closure",
      });
    } else {
      toast({
        title: "Closure Initiated",
        description: "Waiting for lawyer to confirm successful case closure",
      });
      loadDashboardData();
    }
  };

  const handleRespondToSuccessfulClosure = async (caseId: string, accept: boolean, lawyerId: string) => {
    if (accept) {
      // Both parties agree - mark as successfully closed and increment count
      const { error: caseError } = await supabase
        .from("cases")
        .update({ 
          status: "successfully_closed",
          closed_at: new Date().toISOString() 
        })
        .eq("id", caseId);

      if (caseError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not finalize closure",
        });
        return;
      }

      // Increment success count for both lawyer and victim
      const { data: lawyerProfile } = await supabase
        .from("profiles")
        .select("successfully_closed_count")
        .eq("id", lawyerId)
        .single();

      const { data: victimProfile } = await supabase
        .from("profiles")
        .select("successfully_closed_count")
        .eq("id", profile.id)
        .single();

      await supabase
        .from("profiles")
        .update({ successfully_closed_count: (lawyerProfile?.successfully_closed_count || 0) + 1 })
        .eq("id", lawyerId);

      await supabase
        .from("profiles")
        .update({ successfully_closed_count: (victimProfile?.successfully_closed_count || 0) + 1 })
        .eq("id", profile.id);

      toast({
        title: "Case Successfully Closed",
        description: "Both parties confirmed successful case resolution",
      });
    } else {
      // Rejected - revert to open status
      const { error } = await supabase
        .from("cases")
        .update({ 
          status: "open",
          closure_initiated_by: null 
        })
        .eq("id", caseId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not update case",
        });
        return;
      }

      toast({
        title: "Closure Rejected",
        description: "Case returned to open status",
      });
    }
    
    loadDashboardData();
  };

  const handleViewContact = async (caseId: string, lawyerId: string, lawyerName: string) => {
    const { data: contactInfo } = await supabase
      .from("contact_information")
      .select("*")
      .eq("case_id", caseId)
      .eq("lawyer_id", lawyerId)
      .maybeSingle();

    setSelectedContact({
      email: contactInfo?.email,
      phone: contactInfo?.phone_number,
      name: lawyerName
    });
    setContactModalOpen(true);
  };

  const handleDeleteCase = async (caseId: string) => {
    const { error } = await supabase
      .from("cases")
      .delete()
      .eq("id", caseId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete case",
      });
    } else {
      toast({
        title: "Case Deleted",
        description: "The case has been permanently deleted",
      });
      loadDashboardData();
    }
    setCaseToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                  <UserCircle className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      Welcome back, {profile.full_name}
                    </h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      <UserCircle className="w-3 h-3 mr-1" />
                      Seeking Justice
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Manage your cases and connect with pro bono lawyers
                  </p>
                  <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{openCases.length} Open Cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{pastLawyers.length} Past Lawyers</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setShowNewCase(true)} size="lg" className="px-6 h-12">
                <Plus className="h-5 w-5 mr-2" />
                New Case
              </Button>
            </div>
          </div>
        </div>

      {/* Open Cases */}
      <Card className="mb-8 border-primary/10 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            My Open Cases
          </CardTitle>
          <CardDescription className="text-base">Cases you're currently working on with lawyers</CardDescription>
        </CardHeader>
        <CardContent>
          {openCases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You don't have any open cases yet</p>
              <Button onClick={() => setShowNewCase(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Case
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {openCases.map((caseItem) => {
                const isPendingClosure = caseItem.status === "pending_closure";
                const initiatedByVictim = caseItem.closure_initiated_by === profile.id;
                
                return (
                  <Card key={caseItem.id} className="border-2 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{caseItem.title}</h3>
                          <p className="text-muted-foreground mb-3">{caseItem.description}</p>
                          {caseItem.profiles ? (
                            <div className="flex gap-4 text-sm mb-2">
                              <span>Lawyer: {caseItem.profiles.full_name}</span>
                              <span>@{caseItem.profiles.username}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground mb-2">Waiting for lawyer assignment</p>
                          )}
                          {isPendingClosure && (
                            <Badge variant="secondary" className="mb-2">
                              {initiatedByVictim ? "Awaiting lawyer confirmation" : "Lawyer initiated closure"}
                            </Badge>
                          )}
                        </div>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            {caseItem.profiles && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/u/${caseItem.profiles.username}`}>
                                      <Button size="icon" variant="outline">
                                        <UserCircle className="h-4 w-4" />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View Lawyer Profile</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => handleViewContact(caseItem.id, caseItem.assigned_lawyer_id, caseItem.profiles.full_name)}
                                    >
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Contact Lawyer</p>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}
                            {!isPendingClosure && caseItem.assigned_lawyer_id && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => handleInitiateSuccessfulClosure(caseItem.id, caseItem.assigned_lawyer_id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mark Successful</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => setCaseToDelete(caseItem.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Case</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Lawyers */}
      <Card className="border-primary/10 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            Lawyers I've Worked With
          </CardTitle>
          <CardDescription className="text-base">Previous legal representatives who helped with your cases</CardDescription>
        </CardHeader>
        <CardContent>
          {pastLawyers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No past lawyers</p>
          ) : (
            <div className="grid gap-3">
               {pastLawyers.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{item.profiles?.full_name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                  {item.profiles && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={`/u/${item.profiles.username}`}>
                            <Button size="icon" variant="ghost">
                              <UserCircle className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Lawyer Profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <NewCaseDialog 
        open={showNewCase} 
        onOpenChange={setShowNewCase}
        victimId={profile.id}
        onCaseCreated={loadDashboardData}
      />

      {selectedContact && (
        <ContactInfoModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          email={selectedContact.email}
          phone={selectedContact.phone}
          lawyerName={selectedContact.name}
        />
      )}

      <AlertDialog open={!!caseToDelete} onOpenChange={() => setCaseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this case? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => caseToDelete && handleDeleteCase(caseToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
};