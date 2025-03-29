
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Circle } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  avatarUrl: string | null;
  attendance?: number; // Percentage of attendance in the last month
}

interface GroupMembersListProps {
  members: Member[];
}

const GroupMembersList: React.FC<GroupMembersListProps> = ({ members }) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get color based on attendance percentage
  const getAttendanceColor = (attendance?: number) => {
    if (attendance === undefined) return "text-gray-300"; // No data
    if (attendance >= 70) return "text-green-500"; // Good attendance
    if (attendance >= 40) return "text-yellow-500"; // Average attendance
    return "text-red-500"; // Poor attendance
  };

  return (
    <Card className="border border-church-tan shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md text-church-copper">Group Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-20">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    {member.avatarUrl ? (
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                    ) : (
                      <AvatarFallback className="bg-church-gold/10 text-church-gold text-xs">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <Link to={`/profile/${member.id}`} className="text-church-copper hover:text-church-brown hover:underline">
                    {member.name}
                  </Link>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Circle 
                    size={16} 
                    className={`fill-current ${getAttendanceColor(member.attendance)}`}
                    strokeWidth={0}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GroupMembersList;
