import React from 'react';
import BoardElem from './BoardElem';

const Board = ({ board, filters, setSelectedTask, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  return (
    <div className='board_board'>
      <div className='board'>
        <div className='board_titles flex a-start'>
          {board?.map((elem) => (
            <BoardElem
              key={elem.id}
              {...elem}
              filters={filters?.show}
              setSelectedTask={setSelectedTask}
              setDragEnter={setDragEnter}
              setDragOut={setDragOut}
              dragElem={dragElem}
              showResponsible={showResponsible}
              showManager={showManager}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
