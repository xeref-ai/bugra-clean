// src/app/docs/page.tsx
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Rocket, BookOpen, Code, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Data derived from the user's strategic plan
const docsData = {
  pageTitle: "Xeref.ai Documentation",
  pageDescription: "Charting the Course for Xeref.ai: A Strategic Documentation Plan.",
  sections: [
    {
      id: "getting-started",
      title: "Getting Started: The User's First Impression",
      icon: Rocket,
      description: "A clear and concise guide to walk new users through the essential first steps.",
      items: [
        {
          title: "Your First 5 Minutes with Xeref.ai",
          content: "A quick-start guide covering account creation, a brief overview of the main dashboard, and how to initiate the AI Chat Assistant and create the first to-do list item."
        },
        {
          title: "Core Concepts Explained",
          content: "A glossary of key terms and concepts unique to Xeref.ai, such as how the AI learns, what 'Intelligent Suggestions' are, and the basic functionalities of the chat interface."
        },
        {
          title: "Installation and Setup (if applicable)",
          content: "If Xeref.ai has desktop or mobile applications, clear, step-by-step installation guides for each platform are crucial."
        }
      ]
    },
    {
      id: "feature-guides",
      title: "In-Depth Feature Guides: Unlocking the Power of Xeref.ai",
      icon: BookOpen,
      description: "Detailed information to fully utilize the platform's capabilities.",
      subSections: [
        {
          title: "AI Chat Assistant",
          items: [
            {
              title: "Mastering Conversations with the AI Assistant",
              content: "A guide on how to effectively interact with the assistant, including best practices for phrasing questions, using commands, and getting the most relevant responses."
            },
            {
              title: "A Deep Dive into the AI's Capabilities",
              content: "Detailed explanations of what the chat assistant can do, such as setting reminders, searching for information, summarizing text, and integrating with other applications."
            },
            {
              title: "Customizing Your AI Assistant",
              content: "Instructions on how users can personalize the assistant's name, voice (if applicable), and response style to fit their preferences."
            }
          ]
        },
        {
          title: "Intelligent To-Do List",
          items: [
            {
              title: "Beyond the Basic To-Do: Leveraging Intelligent Features",
              content: "Showcasing the 'intelligent' aspects of the to-do list, such as automatic prioritization, deadline suggestions, and task categorization powered by AI."
            },
            {
              title: "Organizing Your Life with Smart Lists",
              content: "Tutorials on creating different types of to-do lists (e.g., for work, personal projects, and shopping), and how to use smart filtering and sorting options."
            },
            {
              title: "Collaboration and Sharing",
              content: "Explaining how to share lists with others, assign tasks, and track progress if the feature is available."
            }
          ]
        }
      ]
    },
    {
      id: "developer-resources",
      title: "Developer-Focused Resources: Empowering Integration",
      icon: Code,
      description: "Building out developer documentation is a critical step for platform growth.",
      items: [
        {
          title: "API Quick Start Guide",
          content: "A simple tutorial that guides a developer through their first API call, including authentication and a basic 'hello world' example."
        },
        {
          title: "Core API Endpoints",
          content: "Detailed documentation for the most critical API endpoints, starting with those related to the AI Chat Assistant and the Intelligent To-Do List. This should include request and response examples in various programming languages."
        },
        {
          title: "Authentication and Authorization",
          content: "Clear and secure instructions on how to obtain and use API keys and manage access permissions."
        }
      ]
    }
  ],
  feedback: {
    title: "A Living Document",
    icon: Lightbulb,
    content: "This initial documentation push should be viewed as the creation of a 'living document.' A feedback mechanism, such as a 'Was this page helpful?' widget or a link to a community forum, should be integrated from the outset to allow the documentation to evolve based on user needs and pain points."
  }
};


const DocsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">{docsData.pageTitle}</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          {docsData.pageDescription}
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        {docsData.sections.map(section => (
          <Card key={section.id} className="bg-card/50 border-border overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
              <section.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl text-card-foreground">{section.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.items?.map((item, index) => (
                  <AccordionItem value={`item-${section.id}-${index}`} key={index}>
                    <AccordionTrigger className="text-base font-semibold hover:no-underline text-left">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {section.subSections?.map((sub, subIndex) => (
                  <div key={subIndex} className="mt-4">
                    <h4 className="text-lg font-semibold text-foreground mb-2 pl-4">{sub.title}</h4>
                    <Accordion type="single" collapsible className="w-full border-t">
                      {sub.items.map((item, itemIndex) => (
                         <AccordionItem value={`item-${section.id}-${subIndex}-${itemIndex}`} key={itemIndex}>
                           <AccordionTrigger className="text-base font-semibold hover:no-underline text-left">
                             {item.title}
                           </AccordionTrigger>
                           <AccordionContent className="text-muted-foreground leading-relaxed">
                             {item.content}
                           </AccordionContent>
                         </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-card/50 border-border">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <docsData.feedback.icon className="h-8 w-8 text-accent" />
             <div>
                <CardTitle className="text-2xl text-card-foreground">{docsData.feedback.title}</CardTitle>
             </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{docsData.feedback.content}</p>
          </CardContent>
        </Card>

      </div>
       <div className="text-center mt-12">
            <Button asChild variant="link">
                <Link href="/">
                    &larr; Back to App
                </Link>
            </Button>
        </div>
    </div>
  );
};

export default DocsPage;
