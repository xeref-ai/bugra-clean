
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, CheckCircle, Briefcase, DollarSign, MapPin, TrendingUp, Clock, Sparkles, Target, Users, BookOpen, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const hiringData = {
  "pageTitle": "Xeref.ai Backend Developer Application",
  "lastUpdated": "June 25th, 2025",
  "jobDetails": {
    "position": "Backend Developer",
    "salary": "$1,000 per month",
    "location": "Remote",
    "growthPotential": "Significant growth potential, including a path to CTO for the right candidate",
    "workExpectations": "Long hours, high pace, high urgency"
  },
  "offering": [
    "Opportunity to be at the forefront of AGI and productivity innovation",
    "Work that challenges and enhances your abilities daily",
    "No bureaucracy or middle management",
    "Direct impact on the future and global user base",
    "Everything built will reach over 250,000 users"
  ],
  "requirements": [
    "5+ years of backend development experience, ideally in SaaS startups",
    "Expertise in Python, FastAPI, SQL, and Supabase",
    "Exceptional work ethic and high energy",
    "Ability to pursue an ambitious vision while managing critical details",
    "Agility to rapidly adapt and innovate",
    "Support Bugra Karsli in efficiently executing and scaling the vision"
  ],
  "applicationForm": {
    "fields": [
      {"label": "Full Legal Name", "type": "text", "required": true},
      {"label": "Country", "type": "text", "required": true},
      {"label": "Primary Backend Stack", "type": "select", "options": ["Python (Django / FastAPI / Flask)", "Node.js (Express.js)", "Ruby on Rails", "Java (Spring Boot)", "Go (Gin / Echo)", "Other"], "required": true},
      {"label": "Current Timezone", "type": "text", "required": true},
      {"label": "Current Status", "type": "select", "options": ["Freelancer", "Student", "Full-Time Job", "Business Owner", "Unemployed"], "required": true},
      {"label": "Age", "type": "number", "required": true},
      {"label": "Show Best Work (2 links and explanation)", "type": "textarea", "required": true},
      {"label": "Handling Current Commitments", "type": "select", "options": ["Quit current job/projects/school", "Manage both effectively", "Not sure"], "required": true},
      {"label": "Work Frequency per Week", "type": "select", "options": ["4 days or less", "5 days", "6 days", "7 days"], "required": true},
      {"label": "Currently using Xeref.ai", "type": "select", "options": ["Yes", "No"], "required": true},
      {"label": "Other Productivity Apps Used", "type": "checkbox", "options": ["Notion", "Todoist", "ClickUp", "Asana", "Trello", "Monday.com", "Other"], "required": true},
      {"label": "Frontend Concepts Knowledge (1-10)", "type": "scale", "range": [1,10], "required": true},
      {"label": "Willingness to Sign NDA and Non-compete", "type": "select", "options": ["Yes", "No", "Maybe"], "required": true},
      {"label": "Improvement Suggestions for Xeref.ai", "type": "textarea", "required": true},
      {"label": "Availability", "type": "select", "options": ["One or two days a week", "Several hours each day", "A few hours each day", "Only when sleeping", "Always reachable"], "required": true},
      {"label": "Python and FastAPI Experience (1-10)", "type": "scale", "range": [1,10], "required": true},
      {"label": "First Move After Understanding Codebase", "type": "textarea", "required": true},
      {"label": "Able to Work Weekends", "type": "select", "options": ["Yes", "No"], "required": true},
      {"label": "3-minute Introduction Video Upload", "type": "file", "maxSize": "1GB", "required": true}
    ],
    "submissionEmail": "careers@bugrakarsli.com",
    "contactInfo": "For questions, please reach out to careers@bugrakarsli.com"
  }
};

const FormField = ({ field }: { field: any }) => {
    const id = field.label.replace(/\s+/g, '-').toLowerCase();
    const [sliderValue, setSliderValue] = useState(field.range ? field.range[0] : 0);

    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'number':
                return <Input id={id} type={field.type} required={field.required} className="bg-muted/50 border-border" />;
            case 'textarea':
                return <Textarea id={id} required={field.required} className="bg-muted/50 border-border min-h-[100px]" />;
            case 'select':
                return (
                    <Select required={field.required}>
                        <SelectTrigger id={id} className="w-full bg-muted/50 border-border">
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'checkbox':
                return (
                    <div className="space-y-2 pt-2">
                        {field.options.map((option: string) => (
                            <div key={option} className="flex items-center space-x-2">
                                <Checkbox id={`${id}-${option}`} />
                                <Label htmlFor={`${id}-${option}`} className="font-normal">{option}</Label>
                            </div>
                        ))}
                    </div>
                );
            case 'scale':
                return (
                    <div className="flex items-center space-x-4 pt-2">
                        <Slider
                          id={id}
                          min={field.range[0]}
                          max={field.range[1]}
                          step={1}
                          value={[sliderValue]}
                          onValueChange={(value) => setSliderValue(value[0])}
                          required={field.required}
                        />
                        <span className="font-semibold text-primary w-8 text-center">{sliderValue}</span>
                    </div>
                );
            case 'file':
                return (
                    <div className="relative">
                        <Input id={id} type="file" required={field.required} className="bg-muted/50 border-border pr-20" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{field.maxSize} max</span>
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="font-semibold">{field.label}{field.required && <span className="text-destructive ml-1">*</span>}</Label>
            {renderField()}
        </div>
    );
};


const HiringPage = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Application Submitted!",
            description: "Thank you for your interest. We will review your application and get back to you soon.",
            variant: "default",
            duration: 5000,
        });
    };
    
    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <header className="mb-10">
                    <Button asChild variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground">
                        <Link href="/login">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{hiringData.pageTitle}</h1>
                    <p className="text-muted-foreground mt-2">Last Updated: {hiringData.lastUpdated}</p>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-8">
                         <Card className="bg-card/50 border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center"><Briefcase className="mr-3 text-primary" /> Job Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-muted-foreground">
                                <p><strong className="text-foreground">Position:</strong> {hiringData.jobDetails.position}</p>
                                <p><strong className="text-foreground">Salary:</strong> {hiringData.jobDetails.salary}</p>
                                <p><strong className="text-foreground">Location:</strong> {hiringData.jobDetails.location}</p>
                                <p><strong className="text-foreground">Growth:</strong> {hiringData.jobDetails.growthPotential}</p>
                                <p><strong className="text-foreground">Pace:</strong> {hiringData.jobDetails.workExpectations}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center"><Sparkles className="mr-3 text-primary" /> What We Offer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    {hiringData.offering.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                         <Card className="bg-card/50 border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center"><Target className="mr-3 text-primary" /> What We're Looking For</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    {hiringData.requirements.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="bg-card/50 border-border">
                            <CardHeader>
                                <CardTitle>Application Form</CardTitle>
                                <CardDescription>Please fill out the form below. All fields marked with an asterisk are required.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {hiringData.applicationForm.fields.map(field => (
                                        <FormField key={field.label} field={field} />
                                    ))}
                                    <div className="border-t border-border pt-6 text-center">
                                        <Button type="submit" size="lg" className="w-full max-w-xs">
                                            Submit Application
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-4">
                                           By submitting, you agree to our Privacy Policy and Terms of Service.
                                           For questions, please email <a href={`mailto:${hiringData.applicationForm.contactInfo}`} className="text-primary hover:underline">{hiringData.applicationForm.contactInfo}</a>.
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <footer className="text-center mt-12 border-t border-border pt-8">
                    <p className="text-muted-foreground">
                        <Link href="https://bugrakarsli.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        bugrakarsli.com
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default HiringPage;
