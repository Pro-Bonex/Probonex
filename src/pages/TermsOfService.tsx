import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FileText, AlertCircle, ListChecks, Scale, Shield, AlertTriangle, UserX, Copyright, XCircle, Gavel, FileSignature, Layers, Mail } from "lucide-react";

const TermsOfService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Pro Bonex ("the Platform"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Platform.
              </p>
              <p className="mt-2">
                <strong>About Pro Bonex:</strong> Pro Bonex is a student-led open source project created for the 2025 Congressional App Challenge by a student in the 5th Congressional District of New Jersey. The application is fully open source and available at: <a href="https://github.com/Pro-Bonex/Probonex" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/Pro-Bonex/Probonex</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                2. Age Requirement and Eligibility
              </h2>
              <p>
                <strong>You must be at least 18 years of age to use Pro Bonex.</strong> By using the Platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Description of Service</h2>
              <p>
                Pro Bonex is a platform that connects pro bono human rights lawyers with victims of human rights abuses. The Platform facilitates:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>User registration and profile creation for lawyers and victims</li>
                <li>Case creation and management</li>
                <li>Lawyer search and case request functionality</li>
                <li>Communication of contact information between matched parties</li>
              </ul>
              <p className="mt-2">
                <strong>Important:</strong> Pro Bonex is a connection platform only. We do not provide legal services, legal advice, or guarantee any outcomes. We do not provide messaging, file uploads, or case management tools beyond basic information sharing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <ListChecks className="h-6 w-6 text-primary" />
                4. User Responsibilities
              </h2>
              <h3 className="text-xl font-semibold mb-2">4.1 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">4.2 Accurate Information</h3>
              <p>You agree to provide accurate, current, and complete information and to update such information as necessary.</p>

              <h3 className="text-xl font-semibold mb-2 mt-4">4.3 Prohibited Conduct</h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the Platform for any unlawful purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Post false, misleading, or fraudulent information</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to gain unauthorized access to the Platform</li>
                <li>Use automated systems to access the Platform without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                5. Lawyer Obligations
              </h2>
              <p>Lawyers using the Platform represent and warrant that they:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Are licensed to practice law in their respective jurisdiction(s)</li>
                <li>Are in good standing with their bar association</li>
                <li>Will comply with all applicable professional conduct rules</li>
                <li>Are offering services on a pro bono basis</li>
                <li>Will maintain client confidentiality and professional standards</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Bonex does not verify lawyer credentials or bar membership. Users should independently verify lawyer qualifications.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <UserX className="h-6 w-6 text-primary" />
                6. No Attorney-Client Relationship with Pro Bonex
              </h2>
              <p>
                <strong>Pro Bonex is not a law firm and does not provide legal services or legal advice.</strong> No attorney-client relationship is created between you and Pro Bonex by using the Platform. Any attorney-client relationship that may arise is solely between the lawyer and client who connect through the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                7. Disclaimer of Warranties
              </h2>
              <p>
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="mt-2">
                Pro Bonex does not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The Platform will be uninterrupted or error-free</li>
                <li>Any lawyer will accept any particular case</li>
                <li>Any legal representation will result in favorable outcomes</li>
                <li>User-provided information is accurate or reliable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                8. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRO BONEX, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use or inability to use the Platform</li>
                <li>Any conduct or content of any third party on the Platform</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>The quality of legal services provided by lawyers on the Platform</li>
                <li>Any outcomes of legal cases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Pro Bonex and its affiliates from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use of the Platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content you post or transmit through the Platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Copyright className="h-6 w-6 text-primary" />
                10. Content and Intellectual Property
              </h2>
              <p>
                All content on the Platform, including text, graphics, logos, and software, is the property of Pro Bonex or its licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="mt-2">
                You retain ownership of content you submit but grant Pro Bonex a license to use, display, and distribute such content as necessary to provide the Platform services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-primary" />
                11. Account Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including violation of these Terms. You may also delete your account at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Gavel className="h-6 w-6 text-primary" />
                12. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States and the State of New Jersey, without regard to conflict of law principles.
              </p>
              <p className="mt-2">
                Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on the Platform. Your continued use after such changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" />
                14. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <FileSignature className="h-6 w-6 text-primary" />
                15. Entire Agreement
              </h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Pro Bonex regarding use of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                16. Contact Information
              </h2>
              <p>
                Pro Bonex is a student-led open source project created for the 2025 Congressional App Challenge. If you have any questions or concerns about these Terms of Service, please reach out to us via the GitHub repository's "Issues" or "Discussions" tab at: <a href="https://github.com/Pro-Bonex/Probonex" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/Pro-Bonex/Probonex</a>
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
