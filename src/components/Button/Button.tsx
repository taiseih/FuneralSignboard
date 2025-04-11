import React from 'react';
import styles from '../../styles/Button.module.css'; // CSS Modulesをインポート

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    // CSS Modulesからクラス名を適用
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};

export default Button;