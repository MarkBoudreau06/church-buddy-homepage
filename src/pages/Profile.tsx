import React, { useState, useEffect } from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut } from 'lucide-react';
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
import { toast } from 'sonner';
import { format } from "date-fns";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [denomination, setDenomination] = useState("");
  const { toast: hookToast } = useToast();
  
  // Generate arrays for day, month, and year options
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];
  
  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => ({ 
    value: String(i + 1), 
    label: String(i + 1) 
  }));
  
  // Generate years from current year back 100 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({ 
    value: String(currentYear - i), 
    label: String(currentYear - i) 
  }));

  // Update birthday whenever month, day, or year changes
  useEffect(() => {
    if (birthMonth && birthDay && birthYear) {
      const newDate = new Date(
        parseInt(birthYear), 
        parseInt(birthMonth) - 1, 
        parseInt(birthDay)
      );
      
      // Check if date is valid
      if (!isNaN(newDate.getTime())) {
        setBirthday(newDate);
      }
    }
  }, [birthMonth, birthDay, birthYear]);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("John Smith");
    toast.success("Logged in successfully");
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
    setBirthday(undefined);
    setBirthMonth("");
    setBirthDay("");
    setBirthYear("");
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
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-xl text-church-gold">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-church-darkBrown">
                  Please log in to access your profile.
                </p>
                <Button onClick={handleLogin} className="bg-church-gold text-white hover:bg-church-copper">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6">
            <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2 text-church-copper">
                  <User size={18} />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 pt-4">
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
                      <Label>Birthday</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Select 
                            value={birthMonth} 
                            onValueChange={setBirthMonth}
                          >
                            <SelectTrigger className="border-church-tan">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map(month => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Select 
                            value={birthDay} 
                            onValueChange={setBirthDay}
                          >
                            <SelectTrigger className="border-church-tan">
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map(day => (
                                <SelectItem key={day.value} value={day.value}>
                                  {day.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Select 
                            value={birthYear} 
                            onValueChange={setBirthYear}
                          >
                            <SelectTrigger className="border-church-tan">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map(year => (
                                <SelectItem key={year.value} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {birthday && (
                        <p className="text-xs text-muted-foreground">
                          Selected: {format(birthday, "PPP")}
                        </p>
                      )}
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
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Profile;
