
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [hideDetails, setHideDetails] = React.useState(true);
  
  // In a real app, this would come from authentication context
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleThemeChange = (value: string) => {
    setTheme(value as 'natural' | 'dark' | 'light' | 'blue');
    toast.success(`Theme changed to ${value}`);
    console.log(`Theme set to: ${value}`);
  };

  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked);
    toast.success(`Notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleHideDetailsChange = (checked: boolean) => {
    setHideDetails(checked);
    toast.success(`Personal details will ${checked ? 'be hidden' : 'be visible'} to others`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Logged in successfully");
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNavbar 
        userName={isLoggedIn ? "Member" : "Guest"} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-xl text-church-gold">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-church-darkBrown">
                  Please log in to access your settings.
                </p>
                <Button onClick={handleLogin} className="bg-church-gold text-white hover:bg-church-copper">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                  <span>Settings</span>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="text-church-copper border-church-copper hover:bg-church-tan hover:text-church-darkBrown"
                  >
                    Log out
                  </Button>
                </CardTitle>
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

                {/* Hide Details Setting */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-details" className="text-base font-medium">
                      Hide Personal Details
                    </Label>
                    <Switch 
                      id="hide-details" 
                      checked={hideDetails} 
                      onCheckedChange={handleHideDetailsChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hide your birthday, denomination, and other personal details from other users
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
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Settings;
