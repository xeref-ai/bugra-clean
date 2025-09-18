
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelsDialog } from '@/components/models-dialog';
import { X } from 'lucide-react';
import { type User } from 'firebase/auth';

type AppSettings = {
  model: string;
  temperature: number;
  systemPrompt: string;
  useWebSearch: boolean;
};

export const SettingsPanel = ({
  settings,
  setSettings,
  onClose,
  user
}: {
  settings: AppSettings,
  setSettings: (settings: AppSettings) => void,
  onClose: () => void,
  user: User | null
}) => {
    const tempValue = Array.isArray(settings.temperature) ? settings.temperature[0] : settings.temperature;

    return (
        <div className="bg-[#121016] text-gray-300 flex-shrink-0 flex flex-col border-l border-gray-800 p-6 h-full">
           <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Settings</h2>
                 <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
                        <X size={20} />
                    </Button>
                </div>
           </div>
           <ScrollArea className="flex-1 -mx-6">
            <div className="space-y-6 px-6">
                    <div>
                        <Label className="text-sm font-medium text-gray-400">Model</Label>
                        <div className="mt-2">
                            <ModelsDialog
                                value={settings.model}
                                onValueChange={(model) => setSettings({ ...settings, model })}
                                user={user}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="temperature" className="text-sm font-medium text-gray-400">Temperature</Label>
                            <span className="text-sm text-white font-mono">{tempValue}</span>
                        </div>
                        <Slider
                            id="temperature"
                            value={[tempValue]}
                            onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
                            max={1}
                            step={0.1}
                            className="mt-3"
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-400">System Prompt</Label>
                        <Textarea
                            placeholder="e.g., You are a helpful assistant."
                            className="bg-[#2C2D30] border-gray-700 mt-2 h-36 text-white placeholder:text-gray-500"
                            value={settings.systemPrompt}
                            onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="web-search" className="flex items-center space-x-2 text-sm text-gray-400 cursor-pointer">
                            <span>Web Search</span>
                        </Label>
                        <Switch
                            id="web-search"
                            checked={settings.useWebSearch}
                            onCheckedChange={(checked) => setSettings({ ...settings, useWebSearch: checked })}
                        />
                    </div>
            </div>
           </ScrollArea>
        </div>
    )
}
