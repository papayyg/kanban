import React, { useEffect, useState } from 'react';
import ListElem from './ListElem/ListElem';

const List = ({ menu, filters, board, list, setData, showFiltersBtn }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    setTitles(list?.titles);
  }, [list?.titles]);

  document.setTitles = (array) => {
    setData({menu, filters, board, list: {...list, titles: JSON.parse(array)}});
  };

  document.setElements = (array) => {
    setData({menu, filters, board, list: {...list, elements: JSON.parse(array)}});
  };

  document.setList = (array) => {
    setData({menu, filters, board, list: {...list, elements: [...list.elements, ...JSON.parse(array)]}});
  }

  const handleFilterScroll = (() => {
    let lastScrollTop = 0; // Track last scroll position
  
    return (e) => {
      const target = e.target;
      const isScrollingDown = target.scrollTop > lastScrollTop;
      lastScrollTop = target.scrollTop; // Update the last scroll position
  
      if (isScrollingDown && target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
        // Trigger hidden button click when scrolled to bottom and scrolling down
        document.getElementById('scrollAction_spisok').click();
      }
    };
  })();
  
  return (
    <div style={{ maxHeight: showFiltersBtn ? '85vh' : '90vh', overflowY: 'auto' }} onScroll={handleFilterScroll}>
      <table className='list'>
        <thead className='list_titles'>
          <tr>
            {titles?.map((title) => (
              <th className='list_title' key={title.value}>{title.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className='list_values' onScroll={()=>handleFilterScroll()}>
          {list?.elements?.map((elem) => <ListElem elem={elem} key={elem.id} />)}
        </tbody>
        {list?.loader && 
        <div className='loader'>
          <div className="loader-spinner" style={{left: "48%", width: "70px", height: "70px"}}>
          </div>
        </div>
        }
      </table>
    </div>
  );
};

export default List;
