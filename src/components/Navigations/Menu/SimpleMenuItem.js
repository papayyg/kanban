import React from 'react';

export const SimpleMenuItem = ({ item, onClick }) => {
    return (
        <button
            className='settings_btn default_btn flex'
            onClick={onClick}
        >
            {item.label}
        </button>
    );
};