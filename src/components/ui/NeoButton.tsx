import React, { memo } from 'react';
import { SHADOWS } from '../../lib/constants';

// Memoized Button
export const NeoButton = memo(({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}: {
  children: React.ReactNode,
  onClick?: () => void,
  variant?: 'primary' | 'secondary' | 'accent' | 'white' | 'black' | 'google',
  className?: string,
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset'
}) => {
  const baseStyle = `border-2 border-black font-bold px-6 py-3 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed select-none`;
  const colorStyle = variant === 'white' ? 'bg-white hover:bg-gray-50' :
    variant === 'secondary' ? 'bg-[#FF90E8] hover:bg-[#ff7ae4]' :
    variant === 'accent' ? 'bg-[#23A094] text-white hover:bg-[#1b8278]' :
    variant === 'black' ? 'bg-black text-white hover:bg-gray-800' :
    variant === 'google' ? 'bg-white text-black hover:bg-gray-50' :
    'bg-[#FFDE00] hover:bg-[#e5c700]';

  const activeShadow = disabled ? SHADOWS.none : SHADOWS.md;
  const hoverEffect = disabled ? '' : 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${colorStyle} ${activeShadow} ${hoverEffect} ${className}`}
    >
      {children}
    </button>
  );
});
