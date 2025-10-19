import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  Scale, 
  Heart, 
  Shield, 
  Users, 
  Code, 
  Award, 
  BookOpen, 
  Globe, 
  Lock, 
  Zap, 
  Target, 
  Lightbulb,
  FileText,
  Github,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const About = () => {
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
            <CardTitle className="text-3xl font-bold">About Pro Bonex</CardTitle>
            <p className="text-muted-foreground">Connecting justice with those who need it most</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none space-y-8">
            
            {/* Mission Statement */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed">
                Pro Bonex is a revolutionary platform designed to bridge the gap between victims of human rights abuses and the pro bono legal professionals who can help them. We believe that access to justice should not be limited by financial constraints, and that everyone deserves competent legal representation when their fundamental rights have been violated.
              </p>
            </section>

            {/* Congressional App Challenge */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                2025 Congressional App Challenge
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="mb-4">
                  <strong>Pro Bonex was created by a student in the 5th Congressional District of New Jersey</strong> as part of the 2025 Congressional App Challenge. This prestigious competition encourages students to create innovative applications that address real-world problems and demonstrate the power of technology in solving societal challenges.
                </p>
                <p>
                  The Congressional App Challenge recognizes that technology can be a powerful tool for social good, and Pro Bonex exemplifies this principle by using modern web technologies to connect those in need with those who can help.
                  <a 
                      href="https://www.congressionalappchallenge.us/" 
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer">
                      Learn more about the Congressional App Challenge <ExternalLink className="h-4 w-4" />
                    </a>
                </p>
              </div>
            </section>

            {/* The Problem */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                The Problem We're Solving
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      The Justice Gap
                    </h3>
                    <ul className="space-y-2 text-red-700">
                      <li>• Millions of Americans face human rights violations without legal recourse</li>
                      <li>• Legal fees often exceed $300/hour, making justice inaccessible</li>
                      <li>• Victims struggle to find qualified lawyers with relevant experience</li>
                      <li>• Geographic barriers limit access to specialized legal help</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      The Solution
                    </h3>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Connect victims with pro bono lawyers in their congressional district</li>
                      <li>• Match based on specific human rights violation expertise</li>
                      <li>• Free platform with no hidden costs or fees</li>
                      <li>• Streamlined process from case creation to lawyer connection</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Developer's Motivation */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                Why Pro Bonex Was Created
              </h2>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="mb-4">
                  The developer behind Pro Bonex witnessed firsthand the devastating impact of human rights violations on individuals and communities. Too often, those who have suffered injustice find themselves without the resources or connections needed to seek legal redress.
                </p>
                <p className="mb-4">
                  Recognizing that technology could serve as a bridge between those in need and those willing to help, the developer set out to create a platform that would:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Eliminate financial barriers to legal representation</li>
                  <li>Connect victims with lawyers who have specific expertise in their type of case</li>
                  <li>Ensure geographic accessibility by matching within congressional districts</li>
                  <li>Provide a secure, transparent platform for case management</li>
                  <li>Empower both victims and lawyers to make meaningful connections</li>
                </ul>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                How Pro Bonex Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Create Profiles</h3>
                    <p className="text-sm text-muted-foreground">
                      Lawyers and victims create detailed profiles specifying their location, expertise, and case needs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Smart Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      Our algorithm matches victims with lawyers based on location, expertise, and case type compatibility.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Connect & Help</h3>
                    <p className="text-sm text-muted-foreground">
                      Victims can request help from up to 5 matched lawyers, who can then accept cases and provide pro bono representation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Open Source */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                Open Source & Transparency
              </h2>
              <div className="bg-green-50/50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Github className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Fully Open Source</h3>
                    <p className="text-green-700 mb-3">
                      Pro Bonex is completely open source and available on GitHub. We believe in transparency and community collaboration.
                    </p>
                    <a 
                      href="https://github.com/Pro-Bonex/Probonex" 
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Apache 2.0 License
                  </h4>
                  <p className="text-green-700 text-sm mb-3">
                    Pro Bonex is protected by the Apache 2.0 Open Source License, which provides:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 text-sm">
                    <li>Freedom to use, modify, and distribute the software</li>
                    <li>Protection for contributors and users</li>
                    <li>Clear terms for commercial and non-commercial use</li>
                    <li>Patent protection for contributors</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Built with Modern Technology
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Frontend</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        React 18 with TypeScript
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        TailwindCSS for styling
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Radix UI components
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Framer Motion animations
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Backend & Database</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Supabase for authentication
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        PostgreSQL database
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Real-time data synchronization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Row Level Security (RLS)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Security & Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                Security & Privacy First
              </h2>
              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-6">
                <p className="mb-4 text-blue-800">
                  We understand that legal cases involve sensitive information. Pro Bonex is built with security and privacy as foundational principles:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Data Protection</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• End-to-end encryption for sensitive data</li>
                      <li>• Secure authentication with Supabase Auth</li>
                      <li>• Row-level security policies</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Privacy Controls</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Users control their own data</li>
                      <li>• No selling of personal information</li>
                      <li>• Transparent data usage policies</li>
                      <li>• Easy account deletion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact & Vision */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Our Vision for the Future
              </h2>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="mb-4">
                  Pro Bonex represents more than just a platform—it's a movement toward a more just society where everyone has access to competent legal representation, regardless of their financial circumstances.
                </p>
                <p className="mb-4">
                  Our vision extends beyond the current platform to include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Expanding to cover all types of legal needs, not just human rights cases</li>
                  <li>Building partnerships with law schools and bar associations</li>
                  <li>Developing educational resources for both lawyers and victims</li>
                  <li>Creating a community of advocates committed to pro bono work</li>
                  <li>Using data insights to identify systemic issues and advocate for policy changes</li>
                </ul>
              </div>
            </section>

            {/* Contact & Support */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                Get Involved
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">For Developers</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Help us improve Pro Bonex by contributing to our open source project.
                    </p>
                    <a 
                      href="https://github.com/Pro-Bonex/Probonex" 
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contribute on GitHub <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">For Users</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Have questions or feedback? We'd love to hear from you.
                    </p>
                    <a 
                      href="https://github.com/Pro-Bonex/Probonex/discussions" 
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Discussions <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </section>

          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
