
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import BibleVerseWidget from '@/components/BibleVerseWidget';
import { useAuth } from '@/contexts/AuthContext';

const MemberProfile = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  // Mock data - in a real app, this would come from an API call based on the memberId
  const members = [
    { id: 1, name: "John Smith", role: "Leader", avatarUrl: null, attendance: 85, groups: ["Prayer Warriors", "Men's Ministry"], ministries: ["Worship Team", "Teaching"], email: "john.smith@example.com", phone: "(555) 123-5678" },
    { id: 2, name: "Sarah Johnson", role: "Member", avatarUrl: null, attendance: 73, groups: ["Prayer Warriors", "Women's Ministry"], ministries: ["Children's Ministry"], email: "sarah.johnson@example.com", phone: "(555) 234-5678" },
    { id: 3, name: "Michael Davis", role: "Member", avatarUrl: null, attendance: 55, groups: ["Prayer Warriors", "Youth Group"], ministries: ["Outreach Team"], email: "michael.davis@example.com", phone: "(555) 345-6789" },
    { id: 4, name: "Rebecca Wilson", role: "Member", avatarUrl: null, attendance: 32, groups: ["Prayer Warriors"], ministries: ["Greeting Team"], email: "rebecca.wilson@example.com", phone: "(555) 456-7890" },
    { id: 5, name: "David Thompson", role: "Member", avatarUrl: null, attendance: 92, groups: ["Prayer Warriors", "Bible Study"], ministries: ["Technical Team", "Missions"], email: "david.thompson@example.com", phone: "(555) 567-8901" }
  ];
  
  const member = members.find(m => m.id === Number(memberId));
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Get color based on attendance percentage
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 70) return "bg-green-500";
    if (attendance >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!member) {
    return (
      <div className="flex flex-col h-screen bg-church-lightCream">
        <TopNavbar />
        <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Member Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>The member you're looking for doesn't exist or you don't have permission to view their profile.</p>
              <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft size={16} /> Go Back
              </Button>
            </CardContent>
          </Card>
        </main>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-4">
          <Button 
            variant="outline" 
            className="mb-2 text-church-brown border-church-tan" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Group
          </Button>
          
          <Card className="border border-church-tan shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                {member.avatarUrl ? (
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                ) : (
                  <AvatarFallback className="bg-church-copper text-white text-lg">
                    {getInitials(member.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <CardTitle className="text-xl text-church-darkBrown">{member.name}</CardTitle>
                <p className="text-sm text-church-brown">{member.role}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-church-darkBrown mb-2">Attendance</h3>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={member.attendance} 
                    colorClass={getAttendanceColor(member.attendance)}
                  />
                  <span className="text-sm">{member.attendance}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-church-darkBrown mb-2">Contact Information</h3>
                  <ul className="space-y-1">
                    <li className="text-sm">
                      <span className="text-church-brown">Email: </span>
                      {member.email}
                    </li>
                    <li className="text-sm">
                      <span className="text-church-brown">Phone: </span>
                      {member.phone}
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-church-darkBrown mb-2">Groups</h3>
                  <ul className="space-y-1">
                    {member.groups.map((group, index) => (
                      <li key={index} className="text-sm">{group}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-church-darkBrown mb-2">Ministries</h3>
                  <ul className="space-y-1">
                    {member.ministries.map((ministry, index) => (
                      <li key={index} className="text-sm">{ministry}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <BibleVerseWidget 
            verse="For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
            reference="Ephesians 2:10"
          />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default MemberProfile;
