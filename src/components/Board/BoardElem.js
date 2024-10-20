import React, { useState } from 'react';
import BoardCard from './BoardCard/BoardCard';
import BoardTitle from './BoardTitle/BoardTitle';

const handleContactsScroll = (e, id) => {
  var target = e.target;
  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    var scrollActionElem = document.getElementById("scrollAction");
    if (scrollActionElem) {
      scrollActionElem.id = 'scrollAction_' + id;
      document.getElementById('scrollAction_' + id).click(e);
      scrollActionElem.id = 'scrollAction';
    }
  }
};

const BoardElem = (elem) => {
  const [clicked, setClicked] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    elem.setDragOut(elem);
    elem.dragElem();
    console.log("Dragging over...");
    // Removed the click event from here to prevent multiple triggers
  };

  const handleDrop = (e) => {
      // e.target.click(); 
      // console.log(e)
      e.target.parentElement.parentElement.click()
      console.log("Dropped:", elem.id);
  }

  return (
    <div className='elem-column flex column' id={elem.id} role="button" tabIndex={elem.id}>
      <BoardTitle {...elem} key={elem.title} /> 
      <div 
        className='board_elem' 
        id={elem.id}  
        role="button" 
        tabIndex={elem.id}
        onScroll={(e) => handleContactsScroll(e, elem.id)} 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <BoardCard 
          {...elem} 
          key={elem.id} 
          setDragEnter={elem.setDragEnter} 
          dragElem={elem.dragElem} 
        />
      </div>
    </div>
  );
};

export default BoardElem;
