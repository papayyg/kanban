import React from 'react'
import Menu from './NavElems/Menu'
import NewTask from './NavElems/NewTask'
import Search from './NavElems/Search'
import ShowFiltersBtn from './NavElems/ShowFiltersBtn'
import Type from './NavElems/Type'

const Navigations = (menu) => {
  return (
    <form className='nav-form flex j-between a-center' action=''>
        <div className='nav-form_left flex a-center w-100'>
          {menu?.button && <NewTask {...menu?.button}/> }
          {menu?.type && <Type {...menu}/> }
        </div>
        <div className='nav-form_right flex w-100 a-center j-end'>
          {/* {menu?.search && <Search/> } */}
          {menu?.showFiltersBtn && <ShowFiltersBtn {...menu}/> }
          {menu?.menuBtn && <Menu menu = {menu.menuList} showManager={menu.showManager} showResponsible={menu.showResponsible} date={menu.date} setDate={menu.setDate}/> }
        </div>
    </form>
  )
}

export default Navigations