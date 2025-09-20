import React from 'react';

export interface ButtonProps {
    label: string;
    icon: React.ReactNode;          // 传入任何 React 图标组件
    onClick?: () => void;
    size?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function ThothButton({
                               label,
                               icon,
                               onClick,
                               size = 20,
                               disabled = false,
                               className,
                               style
                           }: ButtonProps) {
    console.log('ThothButton rendered with label:', label, 'icon:', icon);
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size + 12,
                height: size + 12,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#fff',
                color: '#111',
                cursor: disabled ? 'default' : 'pointer',
                ...style
            }}
        >
      <span style={{ width: size, height: size, lineHeight: 0 }}>
        {icon}
      </span>
        </button>
    );
}
