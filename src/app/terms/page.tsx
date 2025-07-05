'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const termsData = {
  "pageTitle": "Terms of Service",
  "lastUpdated": "June 8th, 2025",
  "sections": [
    {
      "title": "Acceptance of Terms",
      "content": "By accessing and using Xeref.ai ('Service'), you agree to comply with and be bound by these Terms of Service."
    },
    {
      "title": "Use of the Service",
      "points": [
        "You must provide accurate and current information during registration.",
        "You are responsible for maintaining the confidentiality of your account details.",
        "Use of our service must comply with applicable laws and regulations."
      ]
    },
    {
      "title": "Account Security",
      "points": [
        "You are responsible for all activities that occur under your account.",
        "You must promptly notify us of any unauthorized use of your account."
      ]
    },
    {
      "title": "User Conduct",
      "points": [
        "You agree not to use the service for unlawful purposes.",
        "You must not disrupt or interfere with the operation of the service."
      ]
    },
    {
      "title": "Intellectual Property",
      "content": "Xeref.ai owns all rights, titles, and interests in and to the Service, including all associated intellectual property rights."
    },
    {
      "title": "Termination",
      "points": [
        "We may terminate or suspend your account and access to the service without prior notice if you violate these terms.",
        "Upon termination, your right to use the service will immediately cease."
      ]
    },
    {
      "title": "Limitation of Liability",
      "content": "Xeref.ai is not liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the service."
    },
    {
      "title": "Changes to Terms",
      "content": "We may modify these Terms of Service from time to time. Changes will be effective upon posting, and your continued use signifies acceptance of the new terms."
    },
    {
      "title": "Governing Law",
      "content": "These terms are governed by and construed according to the laws applicable in your jurisdiction without regard to its conflict of law provisions."
    },
    {
      "title": "Contact Information",
      "content": "If you have any questions about these Terms of Service, please contact us at support@bugrakarsli.com or visit our website at www.bugrakarsli.com."
    }
  ]
};

const TermsPage: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{termsData.pageTitle}</h1>
          <p className="text-muted-foreground mt-2">Last Updated: {termsData.lastUpdated}</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {termsData.sections.map((section: any, index: number) => (
            <Card key={index} className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground !pt-0">
                {section.content && <p className="leading-relaxed">{section.content}</p>}
                {section.points && (
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    {section.points.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
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

export default TermsPage;
