
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  const handleThemeChange = (value: string) => {
    setTheme(value as 'natural' | 'dark' | 'light' | 'blue');
    toast.success(`Theme changed to ${value}`);
  };

  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked);
    toast.success(`Notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={false}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Theme Setting */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="color-theme" className="text-base font-medium">
                    Color Theme
                  </Label>
                </div>
                <Select 
                  value={theme} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="color-theme" className="w-full">
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
                  <Label htmlFor="notifications" className="text-base font-medium">
                    Notifications
                  </Label>
                  <Switch 
                    id="notifications" 
                    checked={notifications} 
                    onCheckedChange={handleNotificationChange}
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
