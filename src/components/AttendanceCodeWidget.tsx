
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from 'lucide-react';

interface AttendanceCodeWidgetProps {
  isLoggedIn: boolean;
}

const AttendanceCodeWidget: React.FC<AttendanceCodeWidgetProps> = ({ isLoggedIn }) => {
  const [attendanceCode, setAttendanceCode] = useState<string>("GUEST");
  
  useEffect(() => {
    if (!isLoggedIn) {
      setAttendanceCode("GUEST");
      return;
    }
    
    // Try to get the stored code from localStorage
    const storedCode = localStorage.getItem('attendanceCode');
    
    if (storedCode) {
      setAttendanceCode(storedCode);
    } else {
      // Generate a new code if one doesn't exist
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      // Store the new code
      localStorage.setItem('attendanceCode', result);
      setAttendanceCode(result);
    }
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
