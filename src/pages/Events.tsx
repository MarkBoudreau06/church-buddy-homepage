
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import ChurchEventsWidget from '@/components/ChurchEventsWidget';

const Events = () => {
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

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={false}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-[33%] space-y-4">
          <h1 className="text-2xl font-bold text-church-darkBrown">Services & Events</h1>
          
          <ChurchEventsWidget 
            services={services} 
            events={events} 
          />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Events;
