
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import SmallGroupWidget from '@/components/SmallGroupWidget';
import ChurchEventsWidget from '@/components/ChurchEventsWidget';
import PageIndicator from '@/components/PageIndicator';
import BottomNavbar from '@/components/BottomNavbar';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const { toast } = useToast();

  // Mock data for services
  const services = [
    {
      id: 1,
      name: "Sunday Morning Worship",
      date: "Sunday, April 21",
      time: "10:30 AM - 12:00 PM",
      location: "Main Sanctuary",
      isService: true
    },
    {
      id: 2,
      name: "Wednesday Bible Study",
      date: "Wednesday, April 24",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      isService: true
    }
  ];

  // Mock data for events
  const events = [
    {
      id: 3,
      name: "Youth Group Meeting",
      date: "Friday, April 19",
      time: "6:30 PM - 8:30 PM",
      location: "Youth Center"
    },
    {
      id: 4,
      name: "Community Outreach",
      date: "Saturday, April 20",
      time: "9:00 AM - 1:00 PM",
      location: "Downtown Area"
    },
    {
      id: 5,
      name: "Church Picnic",
      date: "Sunday, April 28",
      time: "12:30 PM - 3:00 PM",
      location: "Church Grounds"
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
          
          <ChurchEventsWidget 
            services={services} 
            events={events} 
          />
          
          <PageIndicator
            totalPages={5}
            currentPage={0}
          />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Index;
