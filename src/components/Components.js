import React, { useEffect } from 'react';
import Board from './Board/Board';
import Filters from './Filters/Filters';
import List from './List/List';
import Navigations from './Navigations/Navigations';

const Components = ({
  menu,
  updateMenu,
  selectedType,
  setSelectedType,
  showFilter,
  setShowFilter,
  filters,
  board,
  loader2,
  list,
  setDragEnter,
  setDragOut,
  dragElem,
  setData,
  setSelectedTask,
  setDate,
}) => {
  useEffect(() => {
    // Прячем прелоадер, когда пришли все данные
    if (menu && selectedType && board !== undefined) {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          if (preloader?.parentNode) preloader.remove();
        }, 300);
      }
    }
  }, [menu, selectedType, board]);

  return (
    <div>
      <Navigations
        {...menu}
        updateMenu={updateMenu}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setData={setData}
        setDate={setDate}
        setNavLoaded={() => {}}
      />

      {filters?.show && <Filters {...filters} />}

      {selectedType === 'Kanban' && (
        <Board
          board={board || []} 
          filters={filters}
          loader2={loader2}
          setDragEnter={setDragEnter}
          setDragOut={setDragOut}
          dragElem={dragElem}
          showResponsible={menu?.showResponsible}
          showManager={menu?.showManager}
          setSelectedTask={setSelectedTask}
        />
      )}

      {selectedType === 'Spisok' && (
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
    </div>
  );
};

export default Components;
