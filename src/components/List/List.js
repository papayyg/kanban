import React, { useEffect, useState } from 'react'
import ListElem from './ListElem/ListElem'

const List = ({ menu, filters, board, list, setData, setDragEnter, setDragOut, dragElem, showResponsible, showManager }) => {
  // const moreValues = board?.[0]?.deals?.[0]?.more?.map(el => el.value) || [];
  const [titles, setTitles] = useState([])

  useEffect(() => {
    setTitles(list?.titles);
  }, [list?.titles]);

  document.setTitles = (array) => {
    setData({menu, filters, board, list: {...list, titles: JSON.parse(array)}})
  }

  document.setElements = (array) => {
    setData({menu, filters, board, list: {...list, elements: JSON.parse(array)}})
  }

  const handleFilterScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      document.getElementById(`scrollAction_spisok`).click(e);
    }
  };

  console.log(titles, "TITLES")
  console.log(list?.elements)
  
  return (
    <div className='list' onScroll={(e) => handleFilterScroll(e)}>
        <div className='list_titles flex a-center'>
            {titles?.map((title) => (
                <div className='list_title' key={title.value}>{title.label}</div>
            ))}
        </div>
        {list?.elements?.map((elem) => <ListElem elem={elem}/>)}
    </div>
  )
}

export default List