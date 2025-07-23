import React from 'react'
import Loader from '../../Loader'
import BoardElem from './BoardElem'

const Board = ({ board, filters, setSelectedTask, loader2, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  console.log("board loader", loader2)
  return (
    <div className='board_board'>
      <div className='board'>
        <div className='board_titles flex a-start' style={loader2 ? {opacity: "0.5"} : {}}>
          {loader2 && <Loader/>}
          {board?.map((elem) => { return <BoardElem {...elem} setSelectedTask={setSelectedTask} showResponsible={showResponsible} showManager={showManager} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} filters={filters?.show}/>  })}
        </div>
      </div>
    </div>
  )
}

export default Board