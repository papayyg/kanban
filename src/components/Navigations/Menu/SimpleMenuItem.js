import React from 'react';

export const SimpleMenuItem = ({ item, onClick, onMouseEnter }) => {
    return (
        <button
            className='settings_btn default_btn flex'
            id={item.value}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {item.label}
        </button>
    );
};