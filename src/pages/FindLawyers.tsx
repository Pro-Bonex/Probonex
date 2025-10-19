import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, MapPin, CheckCircle, Award } from "lucide-react";

const FindLawyers = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<any>(null);
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [requestedLawyers, setRequestedLawyers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [caseId]);

  const loadData = async () => {
    // Load case data
    const { data: caseInfo } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (!caseInfo) {
      navigate("/dashboard");
      return;
    }

    setCaseData(caseInfo);

    // Load existing requests
    const { data: requests } = await supabase
      .from("case_requests")
      .select("lawyer_id")
      .eq("case_id", caseId);

    setRequestedLawyers(requests?.map(r => r.lawyer_id) || []);

    // Load lawyers matching the case criteria
    const { data: lawyersData } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "lawyer")
      .eq("state", caseInfo.state)
      .eq("congressional_district", caseInfo.congressional_district);

    // Filter lawyers who have at least one matching violation specialty
    const matchingLawyers = (lawyersData || []).filter(lawyer => {
      const hasConstitutionMatch = 
        caseInfo.constitution_violations?.some((v: string) => 
          lawyer.specialties_constitution?.includes(v)
        ) || false;
      
      const hasUdhrMatch = 
        caseInfo.udhr_violations?.some((v: string) => 
          lawyer.specialties_udhr?.includes(v)
        ) || false;

      return hasConstitutionMatch || hasUdhrMatch;
    });

    // Sort by relevance: more matching violations + more successful cases
    const sortedLawyers = matchingLawyers.sort((a, b) => {
      const aMatches = [
        ...(a.specialties_constitution?.filter((s: string) => 
          caseInfo.constitution_violations?.includes(s)
        ) || []),
        ...(a.specialties_udhr?.filter((s: string) => 
          caseInfo.udhr_violations?.includes(s)
        ) || [])
      ].length;

      const bMatches = [
        ...(b.specialties_constitution?.filter((s: string) => 
          caseInfo.constitution_violations?.includes(s)
        ) || []),
        ...(b.specialties_udhr?.filter((s: string) => 
          caseInfo.udhr_violations?.includes(s)
        ) || [])
      ].length;

      // Primary sort: number of matching violations
      if (aMatches !== bMatches) return bMatches - aMatches;
      
      // Secondary sort: successfully closed cases
      return (b.successfully_closed_count || 0) - (a.successfully_closed_count || 0);
    });

    setLawyers(sortedLawyers);
    setLoading(false);
  };

  const handleRequestLawyer = async (lawyerId: string) => {
    if (requestedLawyers.length >= 5) {
      toast({
        variant: "destructive",
        title: "Limit Reached",
        description: "You can request up to 5 lawyers per case",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("case_requests")
        .insert({
          case_id: caseId,
          lawyer_id: lawyerId,
        });

      if (error) throw error;

      toast({
        title: "Request Sent",
        description: "The lawyer has been notified of your case",
      });

      setRequestedLawyers([...requestedLawyers, lawyerId]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not send request",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getMatchingViolationCount = (lawyer: any) => {
    const matches = [
      ...(lawyer.specialties_constitution?.filter((s: string) => 
        caseData.constitution_violations?.includes(s)
      ) || []),
      ...(lawyer.specialties_udhr?.filter((s: string) => 
        caseData.udhr_violations?.includes(s)
      ) || [])
    ];
    return matches.length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Pro Bono Lawyers</h1>
            <p className="text-muted-foreground">
              Request up to 5 lawyers for your case. {requestedLawyers.length}/5 requested
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Your Case</h3>
              <p className="font-medium">{caseData?.title}</p>
              <p className="text-sm text-muted-foreground mb-2">{caseData?.description}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">
                  {caseData?.state} - District {caseData?.congressional_district}
                </Badge>
                {caseData?.constitution_violations?.map((v: string) => (
                  <Badge key={v} variant="outline">{v}</Badge>
                ))}
                {caseData?.udhr_violations?.map((v: string) => (
                  <Badge key={v} variant="outline">{v}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {lawyers.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  No lawyers found matching your case criteria in your congressional district.
                </p>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {lawyers.map((lawyer) => {
                const isRequested = requestedLawyers.includes(lawyer.id);
                const initials = lawyer.full_name
                  ?.split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase() || '?';
                const matchCount = getMatchingViolationCount(lawyer);

                return (
                  <Card key={lawyer.id} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={lawyer.profile_picture_url} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{lawyer.full_name}</h3>
                            <Badge variant="secondary">
                              <Scale className="h-3 w-3 mr-1" />
                              Lawyer
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">@{lawyer.username}</p>
                          
                          {lawyer.bio && (
                            <p className="text-sm mb-2">{lawyer.bio}</p>
                          )}

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{lawyer.state} - District {lawyer.congressional_district}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              <span>{lawyer.successfully_closed_count || 0} successful cases</span>
                            </div>
                          </div>

                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {matchCount} matching {matchCount === 1 ? 'violation' : 'violations'}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          {isRequested ? (
                            <Button disabled variant="secondary">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Requested
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleRequestLawyer(lawyer.id)}
                              disabled={requestedLawyers.length >= 5}
                            >
                              Request
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindLawyers;
