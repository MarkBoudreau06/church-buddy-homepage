
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Phone, Mail, MapPin } from 'lucide-react';

interface ChurchInfoWidgetProps {
  name: string;
  denomination: string;
  address: string;
  bannerImageUrl: string;
  phoneNumber: string;
  email: string;
}

const ChurchInfoWidget = ({
  name,
  denomination,
  address,
  bannerImageUrl,
  phoneNumber,
  email
}: ChurchInfoWidgetProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-church-tan overflow-hidden">
      <div className="h-40 relative overflow-hidden">
        <img 
          src={bannerImageUrl} 
          alt={`${name} campus`} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Church className="h-5 w-5 text-church-copper" />
          <CardTitle className="text-lg font-bold text-church-darkBrown">{name}</CardTitle>
        </div>
        <p className="text-sm text-church-brown mt-1">{denomination}</p>
      </CardHeader>
      <CardContent className="pb-4 space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-church-copper mt-0.5" />
          <p className="text-sm text-church-brown">{address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-church-copper" />
          <p className="text-sm text-church-brown">{phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-church-copper" />
          <p className="text-sm text-church-brown">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurchInfoWidget;
