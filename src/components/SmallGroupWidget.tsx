
import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SmallGroupWidgetProps {
  groupName: string;
  memberCount: number;
  nextMeeting: string;
  location: string;
}

const SmallGroupWidget: React.FC<SmallGroupWidgetProps> = ({
  groupName = "Young Adults",
  memberCount = 12,
  nextMeeting = "Tomorrow, 7:00 PM",
  location = "Fellowship Hall"
}) => {
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
