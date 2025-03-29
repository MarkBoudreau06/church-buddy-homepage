
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';

const Groups = () => {
  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={false}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-[33%] space-y-4">
          {/* Content will go here */}
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Groups;
