
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [birthday, setBirthday] = useState<Date>();
  const [denomination, setDenomination] = useState("");
  const { toast } = useToast();
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("John Smith");
    toast({
      title: "Logged in successfully",
      description: "Welcome back, John Smith!",
    });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
    setBirthday(undefined);
    setDenomination("");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName={userName} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-md space-y-6">
          <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2 text-church-copper">
                <User size={18} />
                {isLoggedIn ? "Your Information" : "Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pt-4">
              {isLoggedIn ? (
                <>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://i.pravatar.cc/150?u=john" alt={userName} />
                    <AvatarFallback className="bg-church-tan text-church-darkBrown text-xl">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-church-darkBrown">{userName}</h2>
                    <p className="text-church-brown">Member since January 2023</p>
                    <p className="text-church-brown">Small Group: Young Adults</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="mt-2 text-church-copper border-church-tan hover:bg-church-tan/20"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <Avatar className="h-24 w-24 mx-auto mb-4 bg-church-tan/50 border border-church-tan">
                    <AvatarFallback className="text-church-brown">
                      <User size={32} />
                    </AvatarFallback>
                  </Avatar>
                  
                  <p className="text-lg text-church-brown mb-4">Not Logged In</p>
                  
                  <Button 
                    onClick={handleLogin}
                    className="bg-church-gold hover:bg-church-copper text-white"
                  >
                    Log In
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {isLoggedIn && (
            <>
              <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-2 text-church-copper">
                    Edit Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      className="border-church-tan"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="birthday"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-church-tan",
                            !birthday && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {birthday ? format(birthday, "PPP") : <span>Select your birthday</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={birthday}
                          onSelect={setBirthday}
                          initialFocus
                          disabled={(date) => date > new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="denomination">Christian Denomination</Label>
                    <Select 
                      value={denomination} 
                      onValueChange={setDenomination}
                    >
                      <SelectTrigger id="denomination" className="border-church-tan">
                        <SelectValue placeholder="Select your denomination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="catholic">Catholic</SelectItem>
                        <SelectItem value="baptist">Baptist</SelectItem>
                        <SelectItem value="methodist">Methodist</SelectItem>
                        <SelectItem value="lutheran">Lutheran</SelectItem>
                        <SelectItem value="presbyterian">Presbyterian</SelectItem>
                        <SelectItem value="anglican">Anglican/Episcopal</SelectItem>
                        <SelectItem value="pentecostal">Pentecostal</SelectItem>
                        <SelectItem value="orthodox">Orthodox</SelectItem>
                        <SelectItem value="evangelical">Evangelical</SelectItem>
                        <SelectItem value="nondenominational">Non-denominational</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full mt-4 bg-church-gold hover:bg-church-copper text-white"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-2 text-church-copper">
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-church-brown">Recent activity will appear here.</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Profile;
