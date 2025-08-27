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
  columns
}) => {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    if (board && Array.isArray(board)) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        preloader.parentNode?.removeChild(preloader);
      }, 300);
    }
  }, [columns, board]);

  console.log(filters, "filters")

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
        setNavLoaded={() => { }}
      />

      {filters?.show ? <Filters {...filters} /> : null}

      {selectedType === 'Kanban' && (
        <Board
          columns={columns}
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
          loader2={loader2}
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
