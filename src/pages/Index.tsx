
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import SmallGroupWidget from '@/components/SmallGroupWidget';
import ChurchEventsWidget from '@/components/ChurchEventsWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';
import ChurchInfoWidget from '@/components/ChurchInfoWidget';
import BottomNavbar from '@/components/BottomNavbar';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const { toast } = useToast();

  // Mock data for upcoming services
  const upcomingServices = [
    {
      id: 1,
      name: "Sunday Morning Worship",
      date: "Sunday, April 21",
      time: "10:30 AM - 12:00 PM",
      location: "Main Sanctuary",
      isService: true
    }
  ];

  // Mock data for events
  const upcomingEvents = [
    {
      id: 3,
      name: "Youth Group Meeting",
      date: "Friday, April 19",
      time: "6:30 PM - 8:30 PM",
      location: "Youth Center"
    }
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
    setUserName("John Smith");
    toast({
      title: "Logged in successfully",
      description: "Welcome back, John Smith!",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName={userName} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex justify-center bg-church-lightCream">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <SmallGroupWidget 
              groupName="Young Adults" 
              memberCount={12} 
              nextMeeting="Tomorrow, 7:00 PM" 
              location="Fellowship Hall"
            />
            
            <BibleVerseWidget 
              verse="The LORD is my shepherd; I shall not want. He makes me lie down in green pastures."
              reference="Psalm 23:1-2"
            />
            
            <ChurchEventsWidget 
              services={upcomingServices} 
              events={upcomingEvents} 
            />
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
          </div>
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Index;
