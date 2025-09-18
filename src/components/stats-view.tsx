
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Award, CheckCircle, MessageSquare, Flame } from 'lucide-react';

const ActivityCell = ({ active, level }: { active: boolean; level: number }) => {
    const bgColor = active ? `rgba(52, 211, 153, ${level * 0.25})` : 'hsl(var(--muted))';
    return <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: bgColor }} />;
};

const ActivityMatrix = () => {
    const days = ['Mon', 'Wed', 'Fri'];
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    
    const matrixData = Array.from({ length: 3 * 30 }, () => ({
        active: Math.random() > 0.3,
        level: Math.ceil(Math.random() * 4)
    }));

    return (
        <div className="p-4 rounded-lg bg-card">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-muted-foreground">ACTIVITY MATRIX</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-sm bg-muted"></div>
                        <div className="h-3 w-3 rounded-sm bg-green-500/20"></div>
                        <div className="h-3 w-3 rounded-sm bg-green-500/50"></div>
                        <div className="h-3 w-3 rounded-sm bg-green-500/80"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex flex-col justify-between text-xs text-muted-foreground">
                    {days.map(day => <span key={day}>{day}</span>)}
                </div>
                <div className="flex flex-col gap-2">
                     <div className="flex justify-around text-xs text-muted-foreground mb-1">
                        {months.map(month => <span key={month} style={{minWidth: '60px', textAlign: 'center'}}>{month}</span>)}
                    </div>
                    <div className="grid grid-cols-30 grid-rows-3 gap-1">
                        {matrixData.map((cell, i) => (
                            <ActivityCell key={i} active={cell.active} level={cell.level} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StatsView = () => {
  return (
    <div className="flex-1 p-8 bg-background text-foreground overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Global Leaderboard */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-400">
                <Award size={18} />
                GLOBAL LEADERBOARD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">OVERALL</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-4xl font-bold text-green-400">#232</p>
                    <p className="text-xs text-muted-foreground">out of 58,798 users</p>
                    <p className="text-xs font-semibold mt-1">GLOBAL RANK</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold">0.39%</p>
                    <p className="text-xs text-muted-foreground">elite performer</p>
                    <p className="text-xs font-semibold mt-1">TOP PERCENTILE</p>
                  </div>
                </div>
              </div>
              <Separator />
               <div>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2"><CheckCircle size={14}/> TASKS COMPLETED</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-green-400">#316</p>
                    <p className="text-xs text-muted-foreground">out of 58,798 users</p>
                    <p className="text-xs font-semibold mt-1">GLOBAL RANK</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">0.54%</p>
                    <p className="text-xs text-muted-foreground">elite performer</p>
                    <p className="text-xs font-semibold mt-1">TOP PERCENTILE</p>
                  </div>
                </div>
              </div>
              <Separator />
               <div>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2"><MessageSquare size={14}/> MESSAGES SENT</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-green-400">#106</p>
                    <p className="text-xs text-muted-foreground">out of 58,798 users</p>
                    <p className="text-xs font-semibold mt-1">GLOBAL RANK</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">0.18%</p>
                    <p className="text-xs text-muted-foreground">elite performer</p>
                    <p className="text-xs font-semibold mt-1">TOP PERCENTILE</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity Matrix & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityMatrix />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-card/50 border-border">
                <CardHeader>
                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><CheckCircle size={14}/> TASKS COMPLETED</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Today</span>
                        <div>
                            <span className="font-bold mr-2">0</span>
                            <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm">Last 7 days</span>
                        <div>
                            <span className="font-bold mr-2">0</span>
                            <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm">Last 30 days</span>
                        <div>
                            <span className="font-bold mr-2">3</span>
                             <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Total</span>
                        <div>
                            <span className="font-bold mr-2">7</span>
                             <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
                <CardHeader>
                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><MessageSquare size={14}/> MESSAGES SENT</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-sm">Today</span>
                         <div>
                            <span className="font-bold mr-2">0</span>
                             <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm">Last 7 days</span>
                        <div>
                            <span className="font-bold mr-2">0</span>
                             <span className="text-xs bg-destructive/20 text-destructive-foreground py-0.5 px-2 rounded-full">LOW</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Last 30 days</span>
                         <div>
                            <span className="font-bold mr-2">46</span>
                             <span className="text-xs bg-primary/20 text-primary-foreground py-0.5 px-2 rounded-full">NORMAL</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Total</span>
                        <div>
                            <span className="font-bold mr-2">96</span>
                             <span className="text-xs bg-primary/20 text-primary-foreground py-0.5 px-2 rounded-full">NORMAL</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
            <Card className="bg-card/50 border-border flex flex-col items-center justify-center p-6">
                <Flame className="h-10 w-10 text-orange-500" />
                <p className="text-5xl font-bold mt-2">0</p>
                <p className="text-sm text-muted-foreground mt-1">Day Streak</p>
            </Card>
        </div>
      </div>
    </div>
  );
};
