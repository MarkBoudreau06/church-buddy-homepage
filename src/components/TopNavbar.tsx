
import React from 'react';
import { User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TopNavbarProps {
  userName?: string;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ 
  userName = "Guest", 
  isLoggedIn = false,
  onLogin
}) => {
  return (
    <nav className="bg-white border-b border-church-tan px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <User size={20} className="text-church-copper" />
        <span className="font-medium text-church-darkBrown">{userName}</span>
      </div>
      <div className="text-center font-bold text-lg text-church-gold">
        Church Buddy
      </div>
      <div>
        {!isLoggedIn ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogin}
            className="flex items-center gap-1 text-church-copper hover:text-church-darkBrown hover:bg-white"
          >
            <LogIn size={18} />
            <span>Login</span>
          </Button>
        ) : (
          <div className="w-[72px]"></div> // Placeholder for balance
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
