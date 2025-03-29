
import React from 'react';

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ 
  totalPages = 3, 
  currentPage = 0 
}) => {
  return (
    <div className="flex justify-center items-center gap-2 py-3">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div 
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === currentPage 
              ? 'bg-church-primary' 
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
