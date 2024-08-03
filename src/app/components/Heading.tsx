interface HeadingProps {
  title: string;
  center?: boolean;
}

import React from 'react';

const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default Heading;
