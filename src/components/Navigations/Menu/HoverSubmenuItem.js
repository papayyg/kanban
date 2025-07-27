import React from 'react';
import { SubmenuArrowIcon, AddIcon } from './Icons';

export const HoverSubmenuItem = ({ item, isActive, onMouseEnter, onItemClick }) => {
    return (
        <div onMouseEnter={onMouseEnter}>
            <button className="default_btn flex a-center">
                {item.label}
                <SubmenuArrowIcon />
            </button>

            {isActive && (
                <div className="submenu">
                    {item.list.map((submenuItem) => (
                        <button
                            key={submenuItem.value}
                            className="submenuItem default_btn flex j-between a-center"
                            onClick={() => onItemClick(item.value, submenuItem.value)}
                        >
                            <p>{submenuItem.label}</p>
                            {submenuItem.checked && <span className="checked_span"></span>}
                        </button>
                    ))}

                    {item.button && (
                        <button
                            id={item.button.value}
                            className="newBtn default_btn flex a-center j-start"
                            onClick={(e) => e.preventDefault()}
                        >
                            <AddIcon />
                            {item.button.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};