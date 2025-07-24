import React, { useRef, useState, useLayoutEffect } from 'react'
import Loader from '../../Loader'
import BoardElem from './BoardElem'

const SKELETON_COLS = [
  { id: 'sk-1', title: 'Обращение', borderColor: '#FF8A65' },
  { id: 'sk-2', title: 'В работе', borderColor: '#2196F3' },
  { id: 'sk-3', title: 'Встреча', borderColor: '#4CAF50' },
  { id: 'sk-4', title: 'Бронь', borderColor: '#FFC107' },
  { id: 'sk-5', title: 'Договор', borderColor: '#9C27B0' },
  { id: 'sk-6', title: 'Назначена встреча', borderColor: '#00ACC1' },
];


const Board = ({ board, filters, setSelectedTask, loader2, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  console.log("board loader", loader2)

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

const colsToRender =
  board && board.length > 0
    ? board
    : SKELETON_COLS.map(col => ({ ...col, skeleton: true, deals: [] }));
    
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
          {colsToRender.map((elem) => { return <BoardElem {...elem} setSelectedTask={setSelectedTask} showResponsible={showResponsible} showManager={showManager} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} filters={filters?.show} /> })}
        </div>
      </div>
    </div>
  )
}

export default Board