
import React from 'react';
import { Users, ChevronRight, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SmallGroupWidgetProps {
  groupName: string;
  memberCount: number;
  nextMeeting: string;
  location: string;
  isLoggedIn: boolean;
  onLogin?: () => void;
}

const SmallGroupWidget: React.FC<SmallGroupWidgetProps> = ({
  groupName = "Young Adults",
  memberCount = 12,
  nextMeeting = "Tomorrow, 7:00 PM",
  location = "Fellowship Hall",
  isLoggedIn = false,
  onLogin
}) => {
  if (!isLoggedIn) {
    return (
      <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white relative">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <Button 
            onClick={onLogin}
            className="bg-church-copper hover:bg-church-darkBrown text-white flex items-center gap-2"
          >
            <LogIn size={18} />
            Log in to access your groups
          </Button>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center justify-between text-church-copper">
            <span className="flex items-center gap-2">
              <Users size={18} />
              My Small Group
            </span>
            <ChevronRight size={18} className="text-church-tan" />
          </CardTitle>
        </CardHeader>
        <CardContent className="filter blur-sm">
          <h3 className="font-bold text-lg text-church-gold">{groupName}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-church-brown">
            <div>{memberCount} members</div>
            <div className="text-right">
              <div className="font-medium">{nextMeeting}</div>
              <div className="text-xs">{location}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center justify-between text-church-copper">
          <span className="flex items-center gap-2">
            <Users size={18} />
            My Small Group
          </span>
          <ChevronRight size={18} className="text-church-tan" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-lg text-church-gold">{groupName}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-church-brown">
          <div>{memberCount} members</div>
          <div className="text-right">
            <div className="font-medium">{nextMeeting}</div>
            <div className="text-xs">{location}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmallGroupWidget;
