
import React from 'react';
import { User, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TopNavbarProps {
  onLogin?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ 
  onLogin
}) => {
  const { isLoggedIn, userProfile, login, logout } = useAuth();
  
  const handleLogin = () => {
    login();
    if (onLogin) onLogin();
    toast.success("Logged in successfully");
  };
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  
  return (
    <nav className="bg-church-background border-b border-church-tan px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <User size={20} className="text-church-copper" />
        <span className="font-medium text-church-darkBrown">{isLoggedIn ? userProfile?.name : "Guest"}</span>
      </div>
      <div className="text-center font-bold text-lg text-church-gold">
        Shepherd
      </div>
      <div>
        {!isLoggedIn ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogin}
            className="flex items-center gap-1 text-church-copper hover:text-church-darkBrown hover:bg-church-background"
          >
            <LogIn size={18} />
            <span>Login</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1 text-church-copper hover:text-church-darkBrown hover:bg-church-background"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
