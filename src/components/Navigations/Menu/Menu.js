import React, { useState, useRef, useCallback } from 'react';
import DateRangePicker from '../NavElems/Calendar'

import { useClickOutside } from './useClickOutside';
import { SettingsIcon } from './Icons';
import { SimpleMenuItem } from './SimpleMenuItem';
import { HoverSubmenuItem } from './HoverSubmenuItem';
import { DropdownMenuItem } from './DropdownMenuItem';

const Menu = ({ startDate, endDate, menu, updateMenu }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setMenuVisible(false);
  });

  const handleToggleMenu = useCallback(() => {
    setMenuVisible(prev => !prev);
  }, []);

  const handleUpdateMenu = useCallback((groupValue, itemValue) => {
    updateMenu(groupValue, itemValue);
    setActiveDropdown(null);
  }, [updateMenu]);

  const handleToggleDropdown = useCallback((itemValue) => {
    setActiveDropdown(prev => (prev === itemValue ? null : itemValue));
  }, []);

  const renderMenuItem = (item) => {
    const hasSubItems = item.list?.length > 0;

    if (!hasSubItems) {
      return (
        <SimpleMenuItem
          key={item.value}
          item={item}
          onClick={() => setMenuVisible(false)}
          onMouseEnter={() => setActiveSubmenu(null)}
        />
      );
    }

    if (item.isDropdown) {
      return (
        <DropdownMenuItem
          key={item.value}
          item={item}
          isActive={activeDropdown === item.value}
          onToggle={() => handleToggleDropdown(item.value)}
          onItemClick={handleUpdateMenu}
          onMouseEnter={() => setActiveSubmenu(null)}
        />
      );
    }

    return (
      <HoverSubmenuItem
        key={item.value}
        item={item}
        isActive={activeSubmenu === item.value}
        onMouseEnter={() => setActiveSubmenu(item.value)}
        onItemClick={handleUpdateMenu}
      />
    );
  };

  return (
    <div className="menu_section" ref={menuRef}>
      <button className="default_btn menu_btn" title="Настройки" onClick={(e) => { e.preventDefault(); handleToggleMenu() }}>
        <SettingsIcon />
      </button>

      {isMenuVisible && (
        <div className="menu" onMouseLeave={() => setActiveSubmenu(null)}>
          <div className="menu_list">
            {menu?.map(renderMenuItem)}
            <DateRangePicker startDay={startDate} endDay={endDate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;