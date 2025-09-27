
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const Header: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-[1.5rem] font-bold text-[var(--foreground)]">{title}</h1>
      {subtitle && <p className="mt-1 text-[var(--muted-foreground)]">{subtitle}</p>}
    </div>
  );
};

export default Header;