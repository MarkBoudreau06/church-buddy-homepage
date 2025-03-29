
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ 
  totalPages = 5, 
  currentPage = 0 
}) => {
  const location = useLocation();
  
  const pages = [
    { path: "/", index: 0 },
    { path: "/events", index: 1 },
    { path: "/profile", index: 2 },
    { path: "/groups", index: 3 },
    { path: "/settings", index: 4 }
  ];
  
  // Determine current page based on location
  const activePage = pages.findIndex(page => page.path === location.pathname);
  const currentPageIndex = activePage !== -1 ? activePage : currentPage;

  return (
    <div className="flex justify-center items-center gap-2 py-3">
      {pages.map((page, index) => (
        <Link 
          key={index}
          to={page.path}
          className={`h-2 w-2 rounded-full ${
            index === currentPageIndex
              ? 'bg-church-gold' 
              : 'bg-church-tan'
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
