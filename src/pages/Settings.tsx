
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import PageIndicator from '@/components/PageIndicator';
import BottomNavbar from '@/components/BottomNavbar';

const Settings = () => {
  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar 
        userName="Guest" 
        isLoggedIn={false}
        onLogin={() => {}}
      />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        <div className="w-full max-w-[33%] space-y-4">
          <PageIndicator
            totalPages={5}
            currentPage={4}
          />
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Settings;
