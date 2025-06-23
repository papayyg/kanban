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
      e.dataTransfer.setData("text/plain", elem.name);
      elem.dragElem();
      console.log("Dragging over...");
      // Removed the click event from here to prevent multiple triggers
    };

    const handleDrop = (e) => {
        // e.target.click(); 
        // console.log(e)const dealName = e.dataTransfer.getData("text/plain");
        const dealName = e.dataTransfer.getData("text/plain");
        console.log(e.dataTransfer, "e.datatransfer")
        e.dataTransfer.setData("text/plain", elem.name);
        if (dealName) {
          console.log("Dropped deal name:", dealName);
        } else {
          console.log("No deal name found in drop data");
        }
        e.target.parentElement.parentElement.click()
        console.log("Dropped:", elem.id);
    }

    return (
      <div className='elem-column flex column' id={elem.id} role="button" tabIndex={elem.id}>
        <BoardTitle {...elem} key={elem.title} /> 
        <div 
          className='board_elem' 
          style={elem?.filters ? { height: "calc(100vh - 230px)" } : { height: "calc(100vh - 180px)" }}
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
            boardId={elem.id}
            setSelectedTask={elem.setSelectedTask}
            setDragEnter={elem.setDragEnter} 
            dragElem={elem.dragElem} 
          />
          {elem?.loader && 
            <div className='loader'>
              <div className="loader-spinner" style={{position: "relative"}}>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };

  export default BoardElem;
