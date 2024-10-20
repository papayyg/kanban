import React, { useState, useEffect, useRef } from 'react';

const Type = ({ type, types, selectedType, setSelectedType }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleTypeClick = (type) => {
    setSelectedType(type.value);
    setShow(false);
  };

  useEffect(() => {
    setSelectedType(type.value);
  },[])

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TableChartIcon"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"></path></svg>
  // <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TableRowsIcon"><path d="M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z"></path></svg>

  return (
    <div ref={ref}>
      {selectedType === "Kanban" ?
      <button className='type_section flex a-center default_btn' id='Kanban' onClick={(e) => {e.preventDefault();setSelectedType("Spisok")}}>
        <svg width="20" height="20" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TableRowsIcon"><path d="M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z"></path></svg>
        <p>Вид: Список</p>
      </button>
      : selectedType === "Spisok" ?
      <button className='type_section flex a-center default_btn' id='Spisok' onClick={(e) => {e.preventDefault();setSelectedType("Kanban")}}>
        <svg width="20" height="20" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TableChartIcon"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"></path></svg>
        <p>Вид: Канбан</p>
      </button> : null
      }
      {/* <p className={selectedType.label === undefined ? `type_btn flex a-center` : `selected_type bg-gray flex a-center`}>
        {selectedType.label === undefined ? (
          <div className='flex a-center' onClick={() => setShow(!show)} style={{ padding: "12px 0 12px 16px" }}>
            Вид
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.28117 10.7264C7.69465 11.0848 8.30877 11.0848 8.72226 10.7264L12.7583 7.22746C13.0504 6.97422 13.0819 6.53213 12.8287 6.24002C12.5754 5.94791 12.1333 5.91639 11.8412 6.16963L8.00171 9.49819L4.1622 6.16963C3.87009 5.91639 3.428 5.94791 3.17476 6.24002C2.92152 6.53213 2.95303 6.97422 3.24514 7.22746L7.28117 10.7264Z" fill="#1B272F" />
            </svg>
          </div>
        ) : (
          <div onClick={() => setShow(!show)} style={{ padding: "12px 0 12px 16px" }}>
            Вид: {selectedType.label}
          </div>
        )}
        {selectedType.label ? (
          <button
            onClick={() => {
              setShow(false);
              handleTypeClick("");
            }}
            style={{ cursor: "pointer", paddingRight: "12px" }}
            className='default_btn'
            id='delete_Вид'
          >
            X
          </button>
        ) : null}
      </p>
      <div className={`types ${show ? "" : "hidden"}`}>
        {types?.map((type) => (
          <div
            className={`type ${selectedType.value === type.value ? 'chosen' : ''}`}
            id={type.value}
            key={type.value}
            onClick={() => handleTypeClick(type)}
          >
            {type.label}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Type;
