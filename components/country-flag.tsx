import React from 'react';

interface CountryFlagProps {
  code: 'AE' | 'GB' | string;
  className?: string;
  width?: number;
  height?: number;
}

export function CountryFlag({ code, className = '', width = 18, height = 12 }: CountryFlagProps) {
  if (code === 'AE') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          borderRadius: '2px',
          boxShadow: '0 0 0 1px rgba(18, 29, 80, 0.15)',
          flexShrink: 0,
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
        aria-label="Flag of UAE"
      >
        <rect width="18" height="4" fill="#009739" />
        <rect y="4" width="18" height="4" fill="#FFFFFF" />
        <rect y="8" width="18" height="4" fill="#000000" />
        <rect width="4.5" height="12" fill="#EF3340" />
      </svg>
    );
  }

  if (code === 'GB' || code === 'UK') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          borderRadius: '2px',
          boxShadow: '0 0 0 1px rgba(18, 29, 80, 0.15)',
          flexShrink: 0,
          display: 'inline-block',
          verticalAlign: 'middle',
          overflow: 'hidden',
        }}
        aria-label="Flag of United Kingdom"
      >
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="square" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" strokeLinecap="square" />
        <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    );
  }

  return null;
}

export default CountryFlag;
