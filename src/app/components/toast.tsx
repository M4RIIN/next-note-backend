import React, { useEffect } from 'react';

type ToastProps = {
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeStyles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div className={`fixed top-4 right-4 p-4 text-white rounded-lg shadow-lg ${typeStyles[type]} transition duration-300 ease-in-out`}>
            {message}
            <button onClick={onClose} className="ml-4 text-white font-semibold">X</button>
        </div>
    );
};

export default Toast;
