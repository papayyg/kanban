import React,{useEffect, useState} from 'react';
import Menu from './NavElems/Menu';
import NewTask from './NavElems/NewTask';
import Search from './NavElems/Search';
import ShowFiltersBtn from './NavElems/ShowFiltersBtn';
import Type from './NavElems/Type';
import 'react-tooltip/dist/react-tooltip.css'; 

const Navigations = (menu) => {

  useEffect(() => {
    const refreshBtn = document.getElementById("refresh");
    if (refreshBtn) refreshBtn.style.cursor = 'pointer';
  
    // Only mark navLoaded when actual data is there
    if (menu?.menuList || menu?.type || menu?.button) {
      menu.setNavLoaded?.(true);
    }
  }, [menu, menu.setNavLoaded]);

  return (
    <form className='nav-form flex j-between a-center' action=''>
      <div className='nav-form_left flex a-center w-100'>
        <NewTask {...menu?.button} />
        <Type {...menu} />
      </div>
      <div className='nav-form_right flex w-100 a-center j-end'>
        <button
          id='refresh'
          title="Обновить"
          className='default_btn refresh_btn'
          onClick={(e) => e.preventDefault()}
        >
          <svg
            data-v-1e3d7c91=""
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon-settings cursor-pointer text-accent"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"
            ></path>
          </svg>
        </button>
        <ShowFiltersBtn {...menu} />
        {menu?.menuBtn && (
          <Menu
            startDate={menu.startDate}
            endDate={menu.endDate}
            menu={menu.menuList}
            updateMenu={menu.updateMenu}
            showManager={menu.showManager}
            showResponsible={menu.showResponsible}
            date={menu.date}
            setDate={menu.setDate}
          />
        )}
      </div>
    </form>
  );
};

export default Navigations;