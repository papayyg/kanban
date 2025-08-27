import { useState, useEffect, useCallback } from 'react';
import Components from './components/Components';
import { useOneCApi } from './hooks/useOneCApi';
import './App.css';

// import mockData from './mock-data.json';

const getUpdatedStateForTaskToggle = (prevState, boardId, dealId, taskId) => {
  const newBoard = (prevState.board || []).map(boardElem => {
    if (boardElem.id !== boardId) return boardElem;
    return {
      ...boardElem,
      deals: (boardElem.deals || []).map(deal => {
        if (deal.id !== dealId) return deal;
        return {
          ...deal,
          task_actions: (deal.task_actions || []).map(task =>
            task.id === taskId ? { ...task, checked: !task.checked } : task
          ),
        };
      }),
    };
  });
  return { ...prevState, board: newBoard };
};

const getUpdatedStateForDrag = (prevState, dragEnter, dragOut) => {
  if (!dragEnter || !dragOut) return prevState;

  const movedDeal = { ...dragEnter, step: dragOut.id };

  const newBoard = (prevState.board || []).map(board => {
    if (board.id === dragOut.id) {
      const newDeals = (board.deals || []).filter(d => d.id !== movedDeal.id);
      return { ...board, deals: [...newDeals, movedDeal] };
    }
    if (board.id === dragEnter.step) {
      return { ...board, deals: (board.deals || []).filter(d => d.id !== dragEnter.id) };
    }
    return board;
  });

  return { ...prevState, board: newBoard };
};


function App() {
  const [data, setData] = useState({});
  const [dragEnter, setDragEnter] = useState(null);
  const [dragOut, setDragOut] = useState(null);
  const [selectedType, setSelectedType] = useState("Kanban");

  useOneCApi(
    setData,
    setDragEnter,
    () => dragEnter,
    () => dragOut
  );


  // useEffect(() => {
  //   setData(prev => ({ ...prev, menu: mockData.menu, filters: mockData.filters }));

  //   const timerColumns = setTimeout(() => {
  //     const columnsOnly = mockData.board.map(({ id, title, borderColor }) => ({
  //       id,
  //       title,
  //       borderColor,
  //       deals: [],
  //     }));
  //     setData(prev => ({ ...prev, board: columnsOnly }));
  //   }, 500);

  //   const timerDeals = setTimeout(() => {
  //     setData({ ...mockData, isLoading: false });
  //   }, 1500);

  //   return () => {
  //     clearTimeout(timerColumns);
  //     clearTimeout(timerDeals);
  //   };
  // }, []);

  const handleDragEnd = useCallback(() => {
    setData(prevState => getUpdatedStateForDrag(prevState, dragEnter, dragOut));
  }, [dragEnter, dragOut]);


  const handleToggleTask = (boardId, dealId, id) => {
    setData(prevState => getUpdatedStateForTaskToggle(prevState, boardId, dealId, id));
  };

  const updateMenu = (value, id) => {
    setData((prevData) => {
      const newMenuList = (prevData.menu.menuList || []).map((menuElem) =>
        menuElem.value === value
          ? {
            ...menuElem,
            list: (menuElem.list || []).map((elem) => ({
              ...elem,
              checked: elem.value === id,
            })),
          }
          : menuElem
      );
      return { ...prevData, menu: { ...prevData.menu, menuList: newMenuList } };
    });
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.target.classList.contains('board_cover')) {
        document.body.style.cursor = 'grabbing';
      }
    };
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="App">
      <Components
        {...data}
        setData={setData}
        updateMenu={updateMenu}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setSelectedTask={handleToggleTask}
        setDragEnter={setDragEnter}
        setDragOut={setDragOut}
        dragElem={handleDragEnd}
        loader2={data.loader}
      />
    </div>
  );
}

export default App;