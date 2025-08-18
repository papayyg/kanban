import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ListElem from './ListElem';
import Loader from '../Loader';
import { useLegacyDataBridge } from '../../hooks/useLegacyDataBridge';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const List = ({ menu, filters, board, list, setData, showFiltersBtn, loader2 }) => {
  const [titles, setTitles] = useState([]);
  const tableRef = useRef(null);

  useLegacyDataBridge(setData, list);

  const { isLoadingMore, handleScroll, onDataLoaded } = useInfiniteScroll(() => {
    document.getElementById('scrollAction_spisok').click();
  });

  const handleRowClick = (href) => {
    document.action_container = `${href}`;
    document.getElementById("action_trigger_main").click();
  };

  useEffect(() => {
    setTitles(list?.titles);
  }, [list?.titles]);

  useEffect(() => {
    onDataLoaded();
  }, [list?.elements, onDataLoaded]);

  const titlesRef = useRef(null);
  const [titlesHeight, setTitlesHeight] = useState('auto');

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

  return (
    <div style={{ position: 'relative', height: showFiltersBtn ? '85vh' : '90vh' }}>
      {loader2 && <Loader />}
      <div style={{ maxHeight: '100%', overflowY: 'auto' }} onScroll={handleScroll}>
        <table className='list' ref={tableRef} style={{
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
            {list?.elements?.map((elem) => (
              <ListElem elem={elem} key={elem.id} onRowClick={handleRowClick} />
            ))}
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