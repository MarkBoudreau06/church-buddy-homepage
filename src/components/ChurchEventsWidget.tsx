
import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [activeTab, setActiveTab] = useState<'services' | 'events'>('services');

  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <Calendar size={18} />
          Services &amp; Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mini page indicator */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`h-2 w-2 rounded-full ${
                activeTab === 'services' ? 'bg-church-gold' : 'bg-church-tan'
              }`}
              aria-label="Show services"
            />
            <button
              onClick={() => setActiveTab('events')}
              className={`h-2 w-2 rounded-full ${
                activeTab === 'events' ? 'bg-church-gold' : 'bg-church-tan'
              }`}
              aria-label="Show events"
            />
          </div>
        </div>

        {/* Tab labels */}
        <div className="flex justify-center mb-3">
          <div className="flex text-sm font-medium">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1 ${
                activeTab === 'services' 
                ? 'text-church-gold border-b-2 border-church-gold' 
                : 'text-church-brown'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1 ${
                activeTab === 'events' 
                ? 'text-church-gold border-b-2 border-church-gold' 
                : 'text-church-brown'
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[200px]">
          {activeTab === 'services' && (
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
          )}

          {activeTab === 'events' && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurchEventsWidget;
