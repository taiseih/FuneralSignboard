import React from 'react'

type ButtonProps = {
    onClick?: () => void
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: '#222',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: "'Shippori Mincho', serif",
            }}
            onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#444'
            }}
            onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#222'
            }}
        >
            {children}
        </button>
    )
}