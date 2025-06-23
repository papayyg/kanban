import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import Board from './Board/Board'
import Filters from './Filters/Filters'
import List from './List/List'
import Navigations from './Navigations/Navigations'

const Components = ({ menu, updateMenu, showFilter, setShowFilter, filters, board, loader, list, setDragEnter, setDragOut, dragElem, setData, setSelectedType, setSelectedTask, setDate }) => {
  const [navLoaded, setNavLoaded] = useState(false);
  console.log(menu, "components")
  return (
    <>
      <Navigations
        {...menu}
        updateMenu={updateMenu}
        setSelectedType={setSelectedType}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setData={setData}
        setDate={setDate}
        setNavLoaded={setNavLoaded}
      />
      {filters?.show && <Filters {...filters} />}
      {menu?.type?.value !== "Kanban" && menu?.type?.value !== "Spisok" ? 
        <Board
          board={board}
          filters={filters}
          setDragEnter={setDragEnter}
          setDragOut={setDragOut}
          dragElem={dragElem}
          showResponsible={menu?.showResponsible}
          showManager={menu?.showManager}
          setSelectedTask={setSelectedTask}
        />
      : menu?.type?.value === "Kanban" ? <Board
          board={board}
          filters={filters}
          setDragEnter={setDragEnter}
          setDragOut={setDragOut}
          dragElem={dragElem}
          showResponsible={menu?.showResponsible}
          showManager={menu?.showManager}
          setSelectedTask={setSelectedTask}
        /> : menu?.type?.value === "Spisok" && (
        <List
          menu={menu}
          filters={filters}
          board={board}
          list={list}
          setData={setData}
          setDragEnter={setDragEnter}
          setDragOut={setDragOut}
          dragElem={dragElem}
          showResponsible={menu?.showResponsible}
          showManager={menu?.showManager}
          showFiltersBtn={filters?.show}
        />
      )}
    </>
  );
}

export default Components