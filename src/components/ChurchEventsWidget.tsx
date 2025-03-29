
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ChurchEvent {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  isService?: boolean;
}

interface ChurchEventsWidgetProps {
  services: ChurchEvent[];
  events: ChurchEvent[];
}

const ChurchEventsWidget: React.FC<ChurchEventsWidgetProps> = ({ 
  services = [], 
  events = [] 
}) => {
  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <Calendar size={18} />
          Services &amp; Events
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[340px]">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2 text-church-gold">Upcoming Services</h3>
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
          
          <Separator className="bg-church-tan" />
          
          <div>
            <h3 className="font-bold mb-2 text-church-gold">Upcoming Events</h3>
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

export default ChurchEventsWidget;
