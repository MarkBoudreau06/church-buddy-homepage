
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from 'lucide-react';

interface AttendanceCodeWidgetProps {
  isLoggedIn: boolean;
}

const AttendanceCodeWidget: React.FC<AttendanceCodeWidgetProps> = ({ isLoggedIn }) => {
  const attendanceCode = useMemo(() => {
    if (!isLoggedIn) return "GUEST";
    
    // Generate a random string of 6 characters (numbers and lowercase letters)
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }, [isLoggedIn]);

  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <QrCode size={18} />
          Attendance Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="bg-church-lightCream px-4 py-2 rounded-md font-mono text-2xl font-bold text-church-darkBrown tracking-wider">
            {attendanceCode}
          </div>
          <p className="text-sm text-church-brown mt-2 text-center">
            {isLoggedIn 
              ? "Show this code when you arrive at service" 
              : "Log in to generate your unique attendance code"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCodeWidget;
