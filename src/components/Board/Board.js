import React from 'react'
import BoardElem from './BoardElem'

const Board = ({ board, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  return (
    <div className='board'>
      <div className='board_titles flex a-start'>
        {board?.map((elem) => { return <BoardElem {...elem} showResponsible={showResponsible} showManager={showManager} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem}/>  })}
      </div>
    </div>
  )
}

export default Board