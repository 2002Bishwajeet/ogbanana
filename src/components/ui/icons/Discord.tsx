import React from 'react';

interface DiscordProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const Discord = ({ size = 24, color = 'currentColor', ...props }: DiscordProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M21.12 4.14A10.15 10.15 0 0 0 12 2a10.15 10.15 0 0 0-9.12 2.14A10.43 10.43 0 0 0 2 12.57a10.28 10.28 0 0 0 4.13 8.29l1.43-1.83a8.23 8.23 0 0 1-2.4-5.03 8.35 8.35 0 0 1 8.3-8.35 8.35 8.35 0 0 1 8.3 8.35 8.23 8.23 0 0 1-2.4 5.03l1.43 1.83a10.28 10.28 0 0 0 4.13-8.29 10.43 10.43 0 0 0-.88-8.43zM7.13 13.57a3.83 3.83 0 1 0 0 5.4 3.83 3.83 0 0 0 0-5.4zm9.74 0a3.83 3.83 0 1 0 0 5.4 3.83 3.83 0 0 0 0-5.4z" />
  </svg>
);