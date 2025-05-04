import React from 'react'

type ButtonProps = {
    onClick?: () => void
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
    const baseStyle = {
        padding: '0.6rem 1.5rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 500,
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }

    const variantStyles = {
        primary: {
            backgroundColor: '#4a90e2',
            color: '#fff',
            hoverBg: '#3a7bc8',
        },
        secondary: {
            backgroundColor: '#f2f2f2',
            color: '#333',
            hoverBg: '#e0e0e0',
        }
    }

    const currentVariant = variantStyles[variant]

    return (
        <button
            onClick={onClick}
            style={{
                ...baseStyle,
                backgroundColor: currentVariant.backgroundColor,
                color: currentVariant.color,
            }}
            onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = currentVariant.hoverBg
                    ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = currentVariant.backgroundColor
                    ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            {children}
        </button>
    )
}