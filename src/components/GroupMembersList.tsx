
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

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

  // Get attendance data based on attendance percentage
  const getAttendanceData = (attendance?: number) => {
    if (attendance === undefined) return { value: 0, colorClass: "" }; // No data
    if (attendance >= 70) return { value: 100, colorClass: "bg-green-500" }; // Good attendance
    if (attendance >= 40) return { value: 66, colorClass: "bg-yellow-500" }; // Average attendance
    return { value: 33, colorClass: "bg-red-500" }; // Poor attendance
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
              <TableHead className="w-24">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(member => {
              const attendanceData = getAttendanceData(member.attendance);
              return (
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
                    {member.attendance !== undefined && (
                      <Progress 
                        value={attendanceData.value} 
                        className="h-2 bg-gray-200 w-full" 
                        colorClass={attendanceData.colorClass} 
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GroupMembersList;
