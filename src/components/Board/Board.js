import React, { useRef, useState, useLayoutEffect } from 'react'
import Loader from '../Loader'
import BoardElem from './BoardElem'

const Board = ({ columns, board, filters, setSelectedTask, loader2, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  const titlesRef = useRef(null);
  const [titlesHeight, setTitlesHeight] = useState('auto');

  const updateHeight = () => {
    if (!titlesRef.current) return;
    // Получаем расстояние от контейнера до верха окна
    const topOffset = titlesRef.current.getBoundingClientRect().top;
    // Считаем доступную высоту
    const available = window.innerHeight - topOffset;
    setTitlesHeight(available + 'px');
  };

  useLayoutEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [loader2, filters?.show, board?.length]);

  const colsToRender = board && board.length > 0 ? board
    : columns && columns.length > 0 ? columns : [];


  return (
    <div className='board_board'>
      <div className='board'>
        <div className='board_titles flex a-start'
          ref={titlesRef} style={{
            ...(loader2 ? { opacity: 0.5 } : {}),
            height: titlesHeight,
            overflowY: 'hidden',
            overflowX: 'auto'
          }}>
          {loader2 && <Loader />}
          {colsToRender.map((elem) => {
            return <BoardElem {...elem}
              key={elem.id} setSelectedTask={setSelectedTask} showResponsible={showResponsible} showManager={showManager} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} filters={filters?.show} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Board