
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ChurchInfoWidget from '@/components/ChurchInfoWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock profile data
  const profileData = {
    name: "John Smith",
    email: "john.smith@example.com",
    memberSince: "January 2019",
    role: "Volunteer",
    avatarUrl: null,
    phoneNumber: "(555) 123-4567",
    birthday: "April 15"
  };

  // Church info data
  const churchInfo = {
    name: "Grace Community Church",
    denomination: "Non-denominational",
    address: "123 Faith Avenue, Graceville, CA 90210",
    bannerImageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    phoneNumber: "(555) 123-4567",
    email: "info@gracecommunity.org"
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Logged in successfully");
  };

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName={isLoggedIn ? profileData.name : "Guest"} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {!isLoggedIn ? (
              <Card>
                <CardHeader>
                  <CardTitle>Login Required</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-church-darkBrown">
                    Please log in to view your profile information.
                  </p>
                  <Button onClick={handleLogin} className="bg-church-gold text-white hover:bg-church-copper">
                    Login
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profileData.avatarUrl || ""} alt={profileData.name} />
                    <AvatarFallback className="bg-church-copper text-white text-lg">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profileData.name}</CardTitle>
                    <p className="text-sm text-church-brown">{profileData.role}</p>
                    <p className="text-xs text-church-brown">Member since {profileData.memberSince}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="info" className="flex-1">Personal Info</TabsTrigger>
                      <TabsTrigger value="involvement" className="flex-1">Church Involvement</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="space-y-2 pt-4">
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Email:</p>
                        <p className="text-sm text-church-brown">{profileData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Phone:</p>
                        <p className="text-sm text-church-brown">{profileData.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Birthday:</p>
                        <p className="text-sm text-church-brown">{profileData.birthday}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="involvement" className="space-y-2 pt-4">
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Small Groups:</p>
                        <p className="text-sm text-church-brown">Young Adults, Prayer Warriors</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Serving Teams:</p>
                        <p className="text-sm text-church-brown">Greeting Team, Tech Team</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Leadership:</p>
                        <p className="text-sm text-church-brown">Small Group Leader</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
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
              verse="Trust in the LORD with all your heart, and do not lean on your own understanding."
              reference="Proverbs 3:5"
            />
          </div>
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Profile;
