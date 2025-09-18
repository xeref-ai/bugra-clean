
'use client';

import React from "react";
import { usePublicConversations } from "@/hooks/use-public-conversations";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublicGalleryPage() {
  const { conversations } = usePublicConversations();

  return (
    <div className="flex-1 p-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">🌍 Public Conversations</h1>
          <p className="text-muted-foreground">Browse AI chats shared by the Xeref.ai community.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Shared Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/share/${conv.userId}/${conv.id}`}
                  className="block p-4 border rounded-lg transition-colors hover:bg-muted/50"
                >
                  <h2 className="font-semibold">{conv.title || "Untitled Chat"}</h2>
                  <p className="text-sm text-muted-foreground">
                    Model: {conv.model} • By: {conv.userId}
                  </p>
                </Link>
              ))}
            </div>

            {conversations.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No public conversations yet. Be the first to share one!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
