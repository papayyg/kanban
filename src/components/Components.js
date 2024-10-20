import React, { useState } from 'react'
import Board from './Board/Board'
import Filters from './Filters/Filters'
import List from './List/List'
import Navigations from './Navigations/Navigations'

const Components = ({menu, filters, board, list, setDragEnter, setDragOut, dragElem, setData, setDate}) => {
  const [showFilter, setShowFilter] = useState(true)
  const [selectedType, setSelectedType] = useState();
  return (
    <div>
      {menu?.show && <Navigations {...menu} selectedType={selectedType} setSelectedType={setSelectedType} showFilter={showFilter} setShowFilter={setShowFilter} setData={setData} setDate={setDate}/ > }
      {showFilter && filters?.show && <Filters {...filters}/> }
      {board && selectedType === "Kanban" ? <Board board={board} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} showResponsible={menu?.showResponsible} showManager={menu?.showManager}/> : <List menu={menu} filters={filters} board={board} list={list} setData={setData} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} showResponsible={menu?.showResponsible} showManager={menu?.showManager}/>}
    </div>
  )
}

export default Components