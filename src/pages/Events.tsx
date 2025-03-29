
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventItem {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  isService?: boolean;
}

const ServicesWidget: React.FC<{ services: EventItem[] }> = ({ services }) => {
  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <Calendar size={18} />
          Worship Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[300px]">
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="mb-3 pb-3 border-b border-church-tan last:border-0">
                <div className="font-medium text-church-darkBrown">{service.name}</div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <Calendar size={14} className="shrink-0" />
                  <span>{service.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <Clock size={14} className="shrink-0" />
                  <span>{service.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <MapPin size={14} className="shrink-0" />
                  <span>{service.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EventsWidget: React.FC<{ events: EventItem[] }> = ({ events }) => {
  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <Calendar size={18} />
          Church Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[300px]">
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="mb-3 pb-3 border-b border-church-tan last:border-0">
                <div className="font-medium text-church-darkBrown">{event.name}</div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <Calendar size={14} className="shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <Clock size={14} className="shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-church-brown mt-1">
                  <MapPin size={14} className="shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
        <div className="w-full max-w-[33%] space-y-6">
          <h1 className="text-2xl font-bold text-church-darkBrown">Services & Events</h1>
          
          <ServicesWidget services={services} />
          <EventsWidget events={events} />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Events;
