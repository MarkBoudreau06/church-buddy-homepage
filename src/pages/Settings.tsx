
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [colorTheme, setColorTheme] = useState('natural');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={false}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-md space-y-4">
          <Card className="border border-church-tan shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-church-darkBrown">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Theme Setting */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="color-theme" className="text-base font-medium text-church-darkBrown">
                    Color Theme
                  </Label>
                </div>
                <Select 
                  value={colorTheme} 
                  onValueChange={setColorTheme}
                >
                  <SelectTrigger id="color-theme" className="w-full border-church-tan">
                    <SelectValue placeholder="Select a color theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural (Default)</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Change the color theme of the website
                </p>
              </div>

              {/* Notifications Setting */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-base font-medium text-church-darkBrown">
                    Notifications
                  </Label>
                  <Switch 
                    id="notifications" 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-church-gold"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about events, service changes, and community updates
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Settings;
