
// src/app/advanced-settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Separator } from '../../components/ui/separator';
import { Settings, KeyRound, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { auth as firebaseAuth, isFirebaseEnabled } from '../../lib/firebase';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className="w-full justify-between pr-2"
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </Button>
);

type SettingRowProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const SettingRow: React.FC<SettingRowProps> = ({ title, description, children }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div>{children}</div>
  </div>
);

const AdvancedSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [dailyFocus, setDailyFocus] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState('Free');
  const auth: Auth | null = firebaseAuth;

  useEffect(() => {
    if (!isFirebaseEnabled || !auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === 'bugrakarsli@gmail.com') {
        setPlan('Ultra');
      } else {
        // In a real app, this would be fetched from the user's profile in Firestore
        // For now, we assume anyone else is on the Free plan.
        setPlan('Free');
      }
    });
    return () => unsubscribe();
  }, [auth]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-black/80 p-4">
      <div className="w-full max-w-4xl bg-[#1e2024] text-gray-200 rounded-lg shadow-2xl flex">
        {/* Sidebar */}
        <aside className="w-1/3 border-r border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Advanced Settings</h2>
          <nav className="space-y-2">
            <NavItem
              icon={Settings}
              label="General"
              isActive={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
            <NavItem
              icon={KeyRound}
              label="API Keys"
              isActive={activeTab === 'apiKeys'}
              onClick={() => setActiveTab('apiKeys')}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-6 flex flex-col">
          {activeTab === 'general' && (
            <>
              <header className="flex justify-between items-center mb-8">
                <h1 className="text-lg font-semibold text-foreground">General Settings</h1>
                <Link href="/" passHref>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                    </Button>
                </Link>
              </header>

              <div className="flex-grow space-y-6">
                <SettingRow
                  title="Daily Focus"
                  description="Show Daily Focus modal automatically"
                >
                  <Switch
                    id="daily-focus-toggle"
                    checked={dailyFocus}
                    onCheckedChange={setDailyFocus}
                    aria-label="Toggle Daily Focus automatic modal"
                  />
                </SettingRow>

                <Separator className="bg-border" />

                <SettingRow
                  title="Clear data"
                  description="Remove your tasks, notes, ideas, projects, and chats. Preferences, completed tasks, and onboarding will NOT be affected."
                >
                  <Button variant="secondary">Clear all data</Button>
                </SettingRow>

                <Separator className="bg-border" />

                <SettingRow
                  title="Delete account"
                  description="Permanently delete your account and all associated data. This action cannot be undone."
                >
                  <Button variant="default">Re-authenticate with Google</Button>
                </SettingRow>
              </div>

              <footer className="mt-8 pt-6 border-t border-border flex justify-end">
                <Button variant="ghost">Cancel</Button>
              </footer>
            </>
          )}

          {activeTab === 'apiKeys' && (
            <>
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-lg font-semibold text-foreground">API Keys</h1>
                    <Link href="/" passHref>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <X className="h-5 w-5" />
                        </Button>
                    </Link>
                </header>
                <div className="flex-grow space-y-6">
                    <div>
                        <h3 className="font-semibold text-foreground">Manage your API keys for programmatic access</h3>
                        <div className="flex items-center justify-between mt-4 p-4 bg-card rounded-md border border-border">
                            <p className="text-sm text-muted-foreground">No API keys yet</p>
                            <Button variant="secondary">Create Key</Button>
                        </div>
                    </div>

                    {plan === 'Free' && (
                        <div className="text-center py-4">
                            <p className="text-muted-foreground mb-2">Upgrade to Pro to create API keys</p>
                            <Button>Upgrade to Pro</Button>
                        </div>
                    )}

                    <Separator className="bg-border" />

                    <div>
                        <h3 className="font-semibold text-foreground mb-2">Setup MCP (Model Context Protocol)</h3>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                <strong className="text-foreground">1. Install mcp-remote</strong><br />
                                Open terminal and run:
                            </p>
                            <pre className="bg-black p-3 rounded-md text-xs text-white overflow-x-auto">
                                <code>npm install -g mcp-remote</code>
                            </pre>
                            <p>
                                <strong className="text-foreground">2. Add to Cursor or other MCP client</strong><br />
                                Add this configuration to your MCP settings:
                            </p>
                            <pre className="bg-black p-3 rounded-md text-xs text-white overflow-x-auto">
                                <code>
{`{
  "mcpServers": {
    "xeref-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:3000/api/mcp",
        "--header",
        "Authorization: Bearer \${MCP_TOKEN}"
      ],
      "env": {
        "MCP_TOKEN": "YOUR_API_KEY_HERE"
      }
    }
  }
}`}
                                </code>
                            </pre>
                            <p>Replace <code className="text-xs bg-muted p-1 rounded">YOUR_API_KEY_HERE</code> with your actual API key from above.</p>
                        </div>
                    </div>
                </div>
                 <footer className="mt-8 pt-6 border-t border-border flex justify-end">
                    <Button variant="ghost">Cancel</Button>
                </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdvancedSettingsPage;
