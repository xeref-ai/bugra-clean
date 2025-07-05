
// src/app/models/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Palette, Brain, Zap, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { auth, isFirebaseEnabled } from '@/lib/firebase';
import { onAuthStateChanged, User } from "firebase/auth";
import { isUltraUser } from '@/lib/auth-utils';

type Model = {
  id: string;
  name: string;
  category: 'Free Models' | 'Pro Models' | 'Ultra Models';
  tier?: 'PRO' | 'ULTRA';
  requires?: string;
  defaultChecked?: boolean;
  iconType?: 'dot';
  iconColor?: string;
  hasStar?: boolean;
};

const ALL_MODELS: Model[] = [
  // Free Models
  { id: 'gpt-4.1', name: 'GPT 4.1', category: 'Free Models', defaultChecked: false, iconType: 'dot', iconColor: 'bg-white', hasStar: true },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', category: 'Free Models', defaultChecked: true, iconType: 'dot', iconColor: 'bg-green-500' },
  { id: 'deepseek-r1-0528', name: 'DeepSeek: R1 0528', category: 'Free Models', defaultChecked: true, iconType: 'dot', iconColor: 'bg-blue-500' },

  // Pro Models
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-orange-400' },
  { id: 'claude-4-sonnet-thinking', name: 'Claude 4 Sonnet Thinking', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-orange-400' },
  { id: 'o3', name: 'o3', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-white' },
  { id: 'o4-mini', name: 'o4 mini', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-white' },
  { id: 'o4-mini-high', name: 'o4 mini high', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-white' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-green-500' },
  { id: 'claude-3.7-thinking', name: 'Claude 3.7 Thinking', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-orange-400' },
  { id: 'grok-3', name: 'Grok 3', category: 'Pro Models', tier: 'PRO', requires: 'Requires Premium', iconType: 'dot', iconColor: 'bg-yellow-400' },

  // Ultra Models
  { id: 'gpt-4.5', name: 'GPT 4.5', category: 'Ultra Models', tier: 'ULTRA', requires: 'Requires Ultra', iconType: 'dot', iconColor: 'bg-white' },
  { id: 'o3-pro', name: 'o3 pro', category: 'Ultra Models', tier: 'ULTRA', requires: 'Requires Ultra', iconType: 'dot', iconColor: 'bg-white' },
  { id: 'claude-4-opus', name: 'Claude 4 Opus', category: 'Ultra Models', tier: 'ULTRA', requires: 'Requires Ultra', iconType: 'dot', iconColor: 'bg-orange-400' },
  { id: 'claude-4-opus-thinking', name: 'Claude 4 Opus Thinking', category: 'Ultra Models', tier: 'ULTRA', requires: 'Requires Ultra', iconType: 'dot', iconColor: 'bg-orange-400' },
];


const LOCAL_STORAGE_KEY_SELECTED_MODELS = 'xeref-selected-models';

const ModelIcon: React.FC<{ model: Model }> = ({ model }) => {
  if (model.iconType === 'dot' && model.iconColor) {
    return <div className={`h-3 w-3 ${model.iconColor} rounded-full mr-3 self-center`} />;
  }
  return <div className="h-3 w-3 bg-muted-foreground/50 rounded-full mr-3 self-center" />;
};

const ModelsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>(
    ALL_MODELS.filter(m => m.defaultChecked).map(m => m.id)
  );
  const { toast } = useToast();

  useEffect(() => {
    if (!isFirebaseEnabled || !auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedModels = localStorage.getItem(LOCAL_STORAGE_KEY_SELECTED_MODELS);
    if (storedModels) {
      try {
        const parsedModels = JSON.parse(storedModels);
         if (Array.isArray(parsedModels) && parsedModels.every(item => typeof item === 'string')) {
            setSelectedModels(parsedModels);
        }
      } catch (e) {
        console.error("Error parsing stored models from localStorage during hydration", e);
        setSelectedModels(ALL_MODELS.filter(m => m.defaultChecked).map(m => m.id));
      }
    }
  }, []);

  const isAdmin = isUltraUser(user);

  const handleModelToggle = (modelId: string) => {
    setSelectedModels((prevSelected) => {
      const newSelected = prevSelected.includes(modelId)
        ? prevSelected.filter((id) => id !== modelId)
        : [...prevSelected, modelId];
      return newSelected;
    });
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_MODELS, JSON.stringify(selectedModels));
    toast({
      title: "Models Saved",
      description: `Selected models: ${selectedModels.map(id => ALL_MODELS.find(m=>m.id === id)?.name || id).join(', ')}`,
    });
    console.log("Selected models saved to localStorage:", selectedModels);
  };

  const modelCategories = ALL_MODELS.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<Model['category'], Model[]>);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-background text-foreground min-h-screen">
      <header className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Models</h1>
          <p className="text-muted-foreground">Current plan: {isAdmin ? 'Ultra' : 'Free'}</p>
        </div>
        <div className="flex items-center space-x-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save</Button>
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </Button>
            </Link>
        </div>
      </header>

      <div className="space-y-10">
        {Object.entries(modelCategories).map(([categoryName, models]) => (
          <section key={categoryName}>
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">{categoryName}</h2>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between p-3 bg-card rounded-md border border-transparent hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={model.id}
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={() => handleModelToggle(model.id)}
                      className="mr-3 h-5 w-5"
                      aria-labelledby={`${model.id}-label`}
                      disabled={!!model.tier && !isAdmin}
                    />
                    <ModelIcon model={model} />
                    <label htmlFor={model.id} id={`${model.id}-label`} className={cn(
                        "text-sm font-medium flex items-center",
                        (!!model.tier && !isAdmin) ? "text-muted-foreground/70" : "cursor-pointer",
                        selectedModels.includes(model.id) ? "text-card-foreground" : "text-muted-foreground"
                    )}>
                      {model.name}
                      {model.hasStar && <Star className="h-4 w-4 ml-2 text-yellow-400 fill-yellow-400" />}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    {model.tier && !isAdmin && (
                      <Badge
                        variant={model.tier === 'PRO' ? 'default' : 'secondary'}
                        className={cn(`
                          border-transparent px-2 py-0.5 text-xs font-bold
                        `,
                          model.tier === 'PRO' && 'bg-blue-600 text-blue-100',
                          model.tier === 'ULTRA' && 'bg-purple-600 text-purple-100',
                        )}
                      >
                        {model.tier}
                      </Badge>
                    )}
                    {model.requires && !isAdmin && (
                      <span className="text-xs text-muted-foreground">{model.requires}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
       <p className="text-xs text-muted-foreground mt-12 text-center">
        Model availability and features depend on your current plan. Selections here are for preference and may not change active models in all parts of the app immediately.
      </p>
    </div>
  );
};

export default ModelsPage;
