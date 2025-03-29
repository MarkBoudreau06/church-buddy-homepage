import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import GroupTitleWidget from '@/components/GroupTitleWidget';
import GroupMembersList from '@/components/GroupMembersList';
import ChurchInfoWidget from '@/components/ChurchInfoWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';

const Groups = () => {
  // Mock data - in a real app, this would come from an API or context
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const groupInfo = {
    name: "Prayer Warriors",
    icon: "users"
  };

  const members = [
    { id: 1, name: "John Smith", role: "Leader", avatarUrl: null },
    { id: 2, name: "Sarah Johnson", role: "Member", avatarUrl: null },
    { id: 3, name: "Michael Davis", role: "Member", avatarUrl: null },
    { id: 4, name: "Rebecca Wilson", role: "Member", avatarUrl: null },
    { id: 5, name: "David Thompson", role: "Member", avatarUrl: null }
  ];

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
        userName={isLoggedIn ? "Member" : "Guest"} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center w-full h-full">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-church-gold">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-church-darkBrown">
                  Please log in to access your groups.
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
              <div className="w-full space-y-4">
                <GroupTitleWidget 
                  name={groupInfo.name} 
                  iconName={groupInfo.icon} 
                />
                <GroupMembersList members={members} />
              </div>
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
                verse="And let us consider how to stir up one another to love and good works."
                reference="Hebrews 10:24"
              />
            </div>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Groups;
