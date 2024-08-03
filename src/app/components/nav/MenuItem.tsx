import React from 'react';

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      className="
  px-4 py-3
  hover:bg-neutral-100
  transition
  
  "
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
