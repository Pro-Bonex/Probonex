import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scale, Briefcase, FileText, CheckCircle, XCircle, UserCircle, Trash2 } from "lucide-react";
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

interface LawyerDashboardProps {
  profile: any;
}

export const LawyerDashboard = ({ profile }: LawyerDashboardProps) => {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [openCases, setOpenCases] = useState<any[]>([]);
  const [pastClients, setPastClients] = useState<any[]>([]);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, [profile.id]);

  const loadDashboardData = async () => {
    // Load pending requests
    const { data: requests } = await supabase
      .from("case_requests")
      .select(`
        *,
        cases (
          *,
          profiles:victim_id (full_name, username, city, state)
        )
      `)
      .eq("lawyer_id", profile.id)
      .eq("status", "pending");

    setPendingRequests(requests || []);

    // Load open and pending_closure cases
    const { data: cases } = await supabase
      .from("cases")
      .select(`
        *,
        profiles:victim_id (full_name, username, city, state)
      `)
      .eq("assigned_lawyer_id", profile.id)
      .in("status", ["open", "pending_closure"]);

    setOpenCases(cases || []);

    // Load successfully closed cases
    const { data: closed } = await supabase
      .from("cases")
      .select(`
        *,
        profiles:victim_id (full_name, username, city, state)
      `)
      .eq("assigned_lawyer_id", profile.id)
      .eq("status", "successfully_closed");

    setPastClients(closed || []);
  };

  const handleRequest = async (requestId: string, caseId: string, accept: boolean) => {
    if (accept) {
      // Use the secure function to handle case acceptance
      const { data, error } = await supabase.rpc('accept_case_request', {
        _request_id: requestId,
        _case_id: caseId,
        _lawyer_id: profile.id
      });

      const result = data as { success: boolean; error?: string } | null;

      if (error || !result?.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result?.error || "Could not accept case",
        });
        return;
      }

      toast({
        title: "Case Accepted",
        description: "You can now view the case details",
      });
    } else {
      // Decline the request
      const { error } = await supabase
        .from("case_requests")
        .update({ status: "rejected" })
        .eq("id", requestId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not decline request",
        });
        return;
      }

      toast({
        title: "Request Declined",
        description: "Request has been declined",
      });
    }
    
    loadDashboardData();
  };

  const handleInitiateSuccessfulClosure = async (caseId: string) => {
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
        description: "Waiting for victim to confirm successful case closure",
      });
      loadDashboardData();
    }
  };

  const handleRespondToSuccessfulClosure = async (caseId: string, accept: boolean, victimId: string) => {
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
        .eq("id", profile.id)
        .single();

      const { data: victimProfile } = await supabase
        .from("profiles")
        .select("successfully_closed_count")
        .eq("id", victimId)
        .single();

      await supabase
        .from("profiles")
        .update({ successfully_closed_count: (lawyerProfile?.successfully_closed_count || 0) + 1 })
        .eq("id", profile.id);

      await supabase
        .from("profiles")
        .update({ successfully_closed_count: (victimProfile?.successfully_closed_count || 0) + 1 })
        .eq("id", victimId);

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

  const handleRegularClose = async (caseId: string) => {
    const { error } = await supabase
      .from("cases")
      .update({ status: "closed", closed_at: new Date().toISOString() })
      .eq("id", caseId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not close case",
      });
    } else {
      toast({
        title: "Case Closed",
        description: "The case has been marked as closed",
      });
      loadDashboardData();
    }
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lawyer Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile.full_name}</p>
      </div>

      {/* Pending Requests */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Incoming Case Requests
          </CardTitle>
          <CardDescription>Review and respond to case requests</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No pending requests</p>
          ) : (
            <div className="grid gap-4">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{request.cases.title}</h3>
                        <p className="text-muted-foreground mb-3">{request.cases.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span>Client: {request.cases.profiles.full_name}</span>
                          <span>Location: {request.cases.profiles.city}, {request.cases.profiles.state}</span>
                        </div>
                        <Badge className="mt-2">{request.cases.abuse_category}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleRequest(request.id, request.cases.id, true)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequest(request.id, request.cases.id, false)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Open Cases */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            My Open Cases
          </CardTitle>
          <CardDescription>Active cases you're working on</CardDescription>
        </CardHeader>
        <CardContent>
          {openCases.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No open cases</p>
          ) : (
            <div className="grid gap-4">
              {openCases.map((caseItem) => {
                const isPendingClosure = caseItem.status === "pending_closure";
                const initiatedByLawyer = caseItem.closure_initiated_by === profile.id;
                
                return (
                  <Card key={caseItem.id} className="border-2 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{caseItem.title}</h3>
                          <p className="text-muted-foreground mb-3">{caseItem.description}</p>
                          <div className="flex gap-4 text-sm mb-2">
                            <span>Client: {caseItem.profiles.full_name}</span>
                            <span>@{caseItem.profiles.username}</span>
                          </div>
                          {isPendingClosure && (
                            <Badge variant="secondary" className="mb-2">
                              {initiatedByLawyer ? "Awaiting victim confirmation" : "Victim initiated closure"}
                            </Badge>
                          )}
                        </div>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/u/${caseItem.profiles.username}`}>
                                  <Button size="icon" variant="outline">
                                    <UserCircle className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Client Profile</p>
                              </TooltipContent>
                            </Tooltip>
                            {!isPendingClosure && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => handleInitiateSuccessfulClosure(caseItem.id)}
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

      {/* Past Clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Past Clients
          </CardTitle>
          <CardDescription>Closed cases and previous clients</CardDescription>
        </CardHeader>
        <CardContent>
          {pastClients.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No past clients</p>
          ) : (
            <div className="grid gap-3">
              {pastClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{client.profiles.full_name}</p>
                    <p className="text-sm text-muted-foreground">{client.title}</p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/u/${client.profiles.username}`}>
                          <Button size="icon" variant="ghost">
                            <UserCircle className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Client Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
  );
};