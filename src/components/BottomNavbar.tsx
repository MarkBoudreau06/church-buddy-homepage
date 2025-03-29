
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Users, Settings } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const tabs = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "Groups", icon: Users, path: "/groups" },
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
            className={`flex flex-col items-center ${
              isActive ? 'text-church-gold' : 'text-church-darkBrown'
            }`}
          >
            <IconComponent size={20} />
            <span className="text-xs mt-1">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavbar;
