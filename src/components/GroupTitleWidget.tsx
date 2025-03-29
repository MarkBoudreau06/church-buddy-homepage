
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { icons } from 'lucide-react';

interface GroupTitleWidgetProps {
  name: string;
  iconName: string;
}

const GroupTitleWidget: React.FC<GroupTitleWidgetProps> = ({ name, iconName }) => {
  // Use the icon if it exists, otherwise default to Users
  const IconComponent = icons[iconName as keyof typeof icons] || Users;
  
  return (
    <Card className="border border-church-tan shadow-sm bg-white overflow-hidden">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="bg-church-gold/10 p-2 rounded-full">
          <IconComponent size={18} className="text-church-gold" />
        </div>
        <h2 className="text-lg font-semibold text-church-darkBrown">{name}</h2>
      </CardContent>
    </Card>
  );
};

export default GroupTitleWidget;
