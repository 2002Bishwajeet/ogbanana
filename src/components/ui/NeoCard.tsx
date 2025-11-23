import React, { memo } from 'react';
import { SHADOWS } from '../../lib/constants';

export const NeoCard = memo(({ children, className = '', color = 'bg-white' }: { children: React.ReactNode, className?: string, color?: string }) => (
  <div className={`${color} border-2 border-black ${SHADOWS.lg} p-6 ${className} transition-transform hover:-translate-y-1 duration-300`}>
    {children}
  </div>
));
