import React from 'react';
import { CloseIcon } from './Icons';

export const DropdownMenuItem = ({ item, isActive, onToggle, onItemClick, onMouseEnter }) => {
    const selectedLabels = item.list
        .filter((subItem) => subItem.checked)
        .map((subItem) => subItem.label)
        .join(', ');

    return (
        <div className="dropdown-container" onMouseEnter={onMouseEnter}>
            <div className="dropdown-header" onClick={onToggle}>
                {item.label}: {selectedLabels}
                {isActive && (
                    <button className="close-button" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
                        <CloseIcon />
                    </button>
                )}
            </div>

            {isActive && (
                <div className="dropdown-list">
                    {item.list.map((subItem) => (
                        <button
                            key={subItem.value}
                            className={`dropdown-item${subItem.checked ? " selected" : ""}`}
                            onClick={() => onItemClick(item.value, subItem.value)}
                        >
                            {subItem.label}
                            {subItem.checked && <span className="dot"></span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};