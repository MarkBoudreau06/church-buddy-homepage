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
import ChurchInfoWidget from '@/components/ChurchInfoWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [hideDetails, setHideDetails] = React.useState(true);
  
  const { isLoggedIn, login, logout } = useAuth();

  // Church info data
  const churchInfo = {
    name: "Grace Community Church",
    denomination: "Non-denominational",
    address: "123 Faith Avenue, Graceville, CA 90210",
    bannerImageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    phoneNumber: "(555) 123-4567",
    email: "info@gracecommunity.org"
  };

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
    logout();
  };

  const handleLogin = () => {
    login();
  };

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar onLogin={handleLogin} />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center w-full h-full">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-church-gold">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center">
                <p className="text-church-darkBrown text-center">
                  Please log in to access your settings.
                </p>
                <Button onClick={handleLogin} className="bg-church-gold text-white hover:bg-church-copper">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
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
            
            <div className="space-y-4">
              <ChurchInfoWidget 
                name={churchInfo.name}
                denomination={churchInfo.denomination}
                address={churchInfo.address}
                bannerImageUrl={churchInfo.bannerImageUrl}
                phoneNumber={churchInfo.phoneNumber}
                email={churchInfo.email}
              />
              
              <BibleVerseWidget 
                verse="Whatever you do, work heartily, as for the Lord and not for men."
                reference="Colossians 3:23"
              />
            </div>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Settings;
