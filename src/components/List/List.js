import React, { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react';
import ListElem from './ListElem/ListElem';
import Loader from '../Loader';

const List = ({ menu, filters, board, list, setData, showFiltersBtn, loader2 }) => {
  const [titles, setTitles] = useState([]);
  const titlesRef = useRef(null);
  const [titlesHeight, setTitlesHeight] = useState('auto');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const updateHeight = () => {
    if (!titlesRef.current) return;
    const topOffset = titlesRef.current.getBoundingClientRect().top;
    const available = window.innerHeight - topOffset;
    setTitlesHeight(available + 'px');
  };

  useLayoutEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [loader2, filters?.show, list?.length]);

  useEffect(() => {
    setTitles(list?.titles);
  }, [list?.titles]);

  useEffect(() => {
    if (isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [list?.elements]);

  document.setTitles = (array) => {
    setData({ menu, filters, board, list: { ...list, titles: JSON.parse(array) } });
  };

  document.setElements = (array) => {
    setData({ menu, filters, board, list: { ...list, elements: JSON.parse(array) } });
  };

  document.setList = (array) => {
    setData({ menu, filters, board, list: { ...list, elements: [...list.elements, ...JSON.parse(array)] } });
  }

  const handleFilterScroll = useCallback((e) => {
    const target = e.target;
    const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (isAtBottom && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        document.getElementById('scrollAction_spisok').click();
      }, 100);
    }
  }, [isLoadingMore]);

  return (
    <div style={{ position: 'relative', height: showFiltersBtn ? '85vh' : '90vh' }}>
      {loader2 && <Loader />}
      <div style={{ maxHeight: '100%', overflowY: 'auto' }} onScroll={handleFilterScroll}>
        <table className='list' ref={titlesRef} style={{
          ...(loader2 ? { opacity: 0.5 } : {}),
          height: titlesHeight,
          overflowY: 'hidden',
          overflowX: 'auto',
          pointerEvents: 'none'
        }}>
          <thead className='list_titles'>
            <tr>
              {titles?.map((title) => (
                <th className='list_title' key={title.value}>{title.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className='list_values'>
            {list?.elements?.map((elem) => <ListElem elem={elem} key={elem.id} />)}
            {isLoadingMore && (
              <tr>
                <td colSpan={titles?.length || 1} style={{ textAlign: 'center', border: 'none', padding: '20px' }}>
                  <div className='loader'>
                    <div className="loader-spinner" style={{ position: "relative" }}></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
