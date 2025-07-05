
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const privacyData = {
  "pageTitle": "Privacy Policy",
  "lastUpdated": "June 8th, 2025",
  "sections": [
    {
      "title": "Introduction",
      "content": "Xeref.ai (“we,” “our,” or “us”) is committed to protecting your privacy while providing you with our task management service. This Privacy Policy explains how we collect, use, share, and protect your personal information. By initiating Google authentication or attempting to access our service, you explicitly consent to the practices described in this Privacy Policy and our Terms of Service."
    },
    {
      "title": "Information We Collect",
      "subsections": [
        {
          "subtitle": "Personal Information",
          "items": [
            { "header": "Account Information", "detail": "When you sign up using Google Authentication, we collect your name and email address." },
            { "header": "Task Data", "detail": "We collect and store the tasks you create and manage within our service." }
          ]
        }
      ]
    },
    {
      "title": "How We Use Your Information",
      "points": [
        "Provide and maintain our task management service",
        "Authenticate your identity through Google Sign-In",
        "Store and manage your tasks",
        "Communicate with you about your account or our services",
        "Process your payments through our payment processor",
        "Send transactional emails through Resend",
        "Improve and optimize our service",
        "Protect against unauthorized access and fraud"
      ]
    },
    {
      "title": "Data Storage and Security",
      "points": [
        "We store your data securely on our servers using industry-standard encryption and security measures",
        "We use Supabase for our database infrastructure",
        "When you sign in with Google, we store and process your data to provide you with our services and continuously improve your experience",
        "To maintain service quality and meet legal obligations, some of your data may be retained for a period of time after account deletion",
        "We use Polar for payment processing, which maintains its own security measures and privacy policy",
        "Internal Access Controls: Most of our developers do not have direct database access; Data analysis is processed through anonymized LLMs; All data access is logged and monitored for security purposes"
      ]
    },
    {
      "title": "Data Sharing",
      "points": [
        "With third-party service providers who assist us in operating our service (Google Auth, Polar, Supabase)",
        "When required by law or to protect our legal rights",
        "With your explicit consent",
        "We do not sell your personal information to third parties."
      ]
    },
    {
      "title": "Marketing Communications",
      "points": [
        "By accessing our service, you consent to receive marketing communications and updates",
        "We may send you promotional materials through email, in-app notifications, SMS, or other channels",
        "You can easily opt-out of marketing communications at any time by emailing us at support@xeref.ai",
        "We'll send you important service updates and account-related information to keep you informed"
      ]
    },
    {
      "title": "Your Rights",
      "points": [
        "Access your personal information",
        "Correct inaccurate data",
        "Opt-out of marketing communications (while maintaining essential service communications)",
        "Request information about how your data is used",
        "To exercise these rights, contact us at support@xeref.ai"
      ]
    },
    {
      "title": "Third-Party Services",
      "points": [
        "Google Authentication for user login",
        "Polar for payment processing",
        "Supabase for data storage",
        "OpenRouter for accessing various AI models",
        "Resend for transactional email services",
        "DeepSeek API, based in China, for our Infinite Thinking feature. By using our service, you consent to your data being processed through this API."
      ]
    },
    {
      "title": "Changes to This Policy",
      "content": "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the “Last Updated” date."
    },
    {
      "title": "Contact Us",
      "content": "If you have questions about this Privacy Policy or our data practices, please contact us at support@xeref.ai or visit our website at www.bugrakarsli.com"
    },
    {
      "title": "Cookie Policy",
      "content": "We use only essential cookies necessary for the functioning of our service, including session management and authentication. We do not use cookies for advertising or tracking purposes."
    }
  ]
};

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{privacyData.pageTitle}</h1>
          <p className="text-muted-foreground mt-2">Last Updated: {privacyData.lastUpdated}</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {privacyData.sections.map((section, index) => (
            <Card key={index} className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground !pt-0">
                {section.content && <p className="leading-relaxed">{section.content}</p>}
                {section.points && (
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="space-y-3">
                    {subsection.subtitle && <h3 className="text-lg font-semibold text-foreground">{subsection.subtitle}</h3>}
                    {subsection.items && subsection.items.map((item, itemIndex) => (
                       <div key={itemIndex} className="pl-4">
                         <h4 className="font-semibold text-foreground">{item.header}</h4>
                         <p className="leading-relaxed">{item.detail}</p>
                       </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
         <div className="text-center mt-12">
            <Button asChild variant="link">
                <Link href="/login">
                    Back to Login
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
