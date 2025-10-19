import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Info, Database, Share2, Lock, Clock, UserCheck, Cookie, AlertCircle, Mail } from "lucide-react";

const PrivacyPolicy = () => {
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
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                1. Introduction
              </h2>
              <p>
                Pro Bonex ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform to connect pro bono human rights lawyers with victims of human rights abuses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                2. Age Requirement
              </h2>
              <p>
                <strong>You must be at least 18 years of age to use Pro Bonex.</strong> We do not knowingly collect personal information from anyone under the age of 18. If we become aware that we have collected personal information from someone under 18, we will take steps to delete such information immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                3. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-2">3.1 Personal Information</h3>
              <p>When you register and use Pro Bonex, we may collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Username and email address (required for all users)</li>
                <li>Full name, city, and state location</li>
                <li>Profile picture (optional)</li>
                <li>Pronouns (optional)</li>
                <li>For Lawyers: Phone number, contact email, website, professional bio</li>
                <li>Case information including abuse details, location, and categorization</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">3.2 Automatically Collected Information</h3>
              <p>We automatically collect certain information when you visit our platform:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and maintain the Pro Bonex platform</li>
                <li>Connect victims with appropriate pro bono lawyers</li>
                <li>Enable case management and communication between parties</li>
                <li>Verify user accounts and prevent fraud</li>
                <li>Improve our services and user experience</li>
                <li>Send administrative notifications related to your account or cases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Share2 className="h-6 w-6 text-primary" />
                5. Information Sharing and Disclosure
              </h2>
              <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>With Other Users:</strong> Profile information is visible to other users as part of the platform's functionality</li>
                <li><strong>Case-Related Sharing:</strong> When you request or accept a case, relevant information is shared between lawyers and victims</li>
                <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety</li>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                6. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                7. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                8. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing of your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                9. Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance user experience and analyze platform usage. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                11. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@probonex.com
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
