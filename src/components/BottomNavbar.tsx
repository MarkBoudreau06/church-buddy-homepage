
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Users, Settings } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const tabs = [
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "Groups", icon: Users, path: "/groups" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ];

  return (
    <nav className="bg-church-cream border-t border-church-tan px-4 py-3 flex items-center justify-around">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const IconComponent = tab.icon;
        
        return (
          <Link 
            key={tab.name} 
            to={tab.path} 
            className="flex flex-col items-center w-16"
          >
            <div className={`flex flex-col items-center ${
              isActive ? 'bg-church-tan text-church-darkBrown rounded-md px-4 py-4 -my-3 w-full' : 'text-church-brown'
            }`}>
              <IconComponent size={20} />
              <span className="text-xs mt-1">{tab.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavbar;
