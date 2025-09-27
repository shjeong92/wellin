
import React from 'react';

interface Props {
  current: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-[var(--secondary)] rounded-full h-2 mb-6">
      <div
        className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
