
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GroupTitleWidget from '@/components/GroupTitleWidget';
import GroupMembersList from '@/components/GroupMembersList';

const Groups = () => {
  // Mock data - in a real app, this would come from an API or context
  const isLoggedIn = false;
  const groupInfo = {
    name: "Prayer Warriors",
    icon: "users"
  };

  const members = [
    { id: 1, name: "John Smith", role: "Leader", avatarUrl: null },
    { id: 2, name: "Sarah Johnson", role: "Member", avatarUrl: null },
    { id: 3, name: "Michael Davis", role: "Member", avatarUrl: null },
    { id: 4, name: "Rebecca Wilson", role: "Member", avatarUrl: null },
    { id: 5, name: "David Thompson", role: "Member", avatarUrl: null }
  ];

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={isLoggedIn}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-[33%] space-y-4">
          <GroupTitleWidget 
            name={groupInfo.name} 
            iconName={groupInfo.icon} 
          />
          
          {isLoggedIn ? (
            <GroupMembersList members={members} />
          ) : (
            <div className="bg-white p-6 rounded-lg border border-church-tan shadow text-center">
              <p className="text-church-darkBrown mb-4">Must be logged in to be in a group</p>
              <Button asChild variant="default" className="bg-church-gold hover:bg-church-gold/90 text-white">
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Groups;
