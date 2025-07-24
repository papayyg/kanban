import React, { useState, useEffect } from 'react';
import Filter from './FilterElems/Filter';

const Filters = ({ filterList, show }) => {
  const [openFilter, setOpenFilter] = useState(null);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.filter-container')) {
      setOpenFilter(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='filters flex a-center' style={{ maxHeight: 58 }}>
      {filterList?.map((filter) => (
        <Filter
          key={filter.id}
          {...filter}
          isOpen={openFilter === filter.id}
          setOpenFilter={setOpenFilter}
          show={show}
        />
      ))}
    </div>
  );
};

export default Filters;
