
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import SmallGroupWidget from '@/components/SmallGroupWidget';
import ChurchEventsWidget from '@/components/ChurchEventsWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';
import BottomNavbar from '@/components/BottomNavbar';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const { toast } = useToast();

  // Mock data for upcoming service only
  const upcomingService = [
    {
      id: 1,
      name: "Sunday Morning Worship",
      date: "Sunday, April 21",
      time: "10:30 AM - 12:00 PM",
      location: "Main Sanctuary",
      isService: true
    }
  ];

  // Mock data for nearest event only
  const nextEvent = [
    {
      id: 3,
      name: "Youth Group Meeting",
      date: "Friday, April 19",
      time: "6:30 PM - 8:30 PM",
      location: "Youth Center"
    }
  ];

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
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-[33%] space-y-4">
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
            services={upcomingService} 
            events={nextEvent} 
          />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Index;
