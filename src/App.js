import Components from './components/Components';
import './App.css';
import { useState, useEffect } from 'react';
import Loader from './Loader';

function App() {
  const [data, setData] = useState({
    menu: {
      type: {value:"Kanban", label:"Канбан"},
      menuList: [],
      showManager: false,
      showResponsible: false,
      startDate: null,
      endDate: null,
    },
    filters: {
      show: true,
      filterList: []
    },
    board: [
      // Покажем хотя бы 3 пустые колонки
      { id: 1, name: 'Колонка 1', deals: [], loader: true },
      { id: 2, name: 'Колонка 2', deals: [], loader: true },
      { id: 3, name: 'Колонка 3', deals: [], loader: true },
      { id: 4, name: 'Колонка 4', deals: [], loader: true }
    ],
    list: {
      titles: [],
      elements: [],
      loader: true
    }
  });
  const [card, setCard] = useState()
  const [dragEnter, setDragEnter] = useState()
  const [dragOut, setDragOut] = useState()
  const [showFilter, setShowFilter] = useState()

  const dragElem = () => {
    // document.body.style.cursor = 'grab';
    setData({ ...data, board: data?.board?.map((elem) => elem?.id === dragOut?.id ? { ...elem, deals: [...elem?.deals, { ...dragEnter, step: elem.id }] } : { ...elem, deals: elem?.deals.filter((deal) => deal.id !== dragEnter?.id) }) })
  }

  document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('board_cover')) {
        document.body.style.cursor = 'grabbing';
      }
  });

  const setSelectedTask = (boardId, dealId, id) => {
    console.log(boardId, dealId, id, "boardId, dealId, id")
    setData({...data, board: 
      data?.board?.map((boardElem) => (
        boardElem?.id === boardId ? {...boardElem, deals: 
          boardElem?.deals?.map((deal) => (
            deal?.id === dealId ? {...deal, task_actions: 
              deal?.task_actions?.map((task) => (
                task?.id === id ? {...task, checked: !task.checked} : task
              ))
            } : deal
          ))
        } : boardElem
      ))
    })
  }

  useEffect(() => {
    // document.body.style.cursor = 'grab';
    setData((prevData) => ({
      ...prevData,
      board: prevData?.board?.map((elem) => ({
        ...elem,
        deals: elem.deals.reduce((uniqueDeals, currentDeal) => {
          // Check if the deal with the same ID is already in uniqueDeals
          const exists = uniqueDeals.some((deal) => deal.id === currentDeal.id);

          // If not, add it to uniqueDeals
          if (!exists) {
            uniqueDeals.push(currentDeal);
          }

          return uniqueDeals;
        }, []),
      })),
    }));
  }, [dragOut])

  // elem.deals.map((deal) => dea)

  useEffect(() => {
    const setDataObject = (string) => {
      const fullData = JSON.parse(string);

      // Плавно обновляем кусками, без перерендера макета
      setTimeout(() => {
        setData(prev => ({
          ...prev,
          menu: fullData.menu
        }));
      }, 0);

      setTimeout(() => {
        setData(prev => ({
          ...prev,
          filters: fullData.filters
        }));
      }, 100);

      const skeletonBoard = fullData.board.map(col => ({
        ...col,
        deals: [],
        loader: true
      }));

      setTimeout(() => {
        setData(prev => ({
          ...prev,
          board: skeletonBoard,
          list: fullData.list
        }));

        // Догружаем сделки по колонкам
        fullData.board.forEach((col, index) => {
          setTimeout(() => {
            setData(prev => ({
              ...prev,
              board: prev.board.map(b =>
                b.id === col.id
                  ? { ...b, deals: col.deals, loader: false }
                  : b
              )
            }));
          }, 300 * index);
        });
      }, 200);
    };

    window.setDataObject = setDataObject;
    document.setDataObject = setDataObject;
    document.getElementById("action_trigger_main")?.click();
  }, []);

  const setSelectedType = (value, label) => {
    setData({...data, menu: {...data?.menu, type: {value: value, label: label}}})
  }

  // functions
  // Тип канбана
  document.setData = (json) => {
    setData(JSON.parse(json))
  }

  document.setType = (type) => {
    setData({ ...data, menu: { ...data.menu, type: type } })
  }

  document.setFilters = (id, array) => {
    setData({ ...data, filters: { ...data.filters, filterList: data.filters.filterList.map((filter) => filter.id === id ? { ...filter, options: JSON.parse(array) } : { ...filter }) } })
  }

  // Показывать менеджера в сделке
  document.showManager = (bool) => {
    setData({ ...data, menu: { ...data.menu, showManager: bool } })
  }

  // Показывать ответственного в сделке
  document.showResponsible = (bool) => {
    setData({ ...data, menu: { ...data.menu, showResponsible: bool } })
  }

  document.showFilters = (bool) => {
    setData({ ...data, filters: { ...data.filters, show: bool } })
  }

  // Назначить дату
  document.setDate = (startDate, endDate) => {
    setData({ ...data, menu: { ...data.menu, startDate: startDate, endDate: endDate } })
  }

  // Фильтры
  document.setFilter = (value, label, id) => {
    setData({ ...data, filters: { ...data.filters, filterList: data.filters.filterList.map((elem) => elem.id === id ? { ...elem, selectedValue: value, selectedLabel: label } : elem) } })
  }

  document.addFilters = (id, array) => {
    setData({ ...data, filters: { ...data?.filters, filterList: data?.filters?.filterList?.map((filter) => filter?.id === id ? { ...filter, options: [...filter.options, ...JSON.parse(array)] } : { ...filter }) } })
  }

  document.setElem = (id, elems) => {
    setData(prevData => {
      const updatedBoard = prevData.board.map(item =>
        item.id === id ? { ...item, deals: [...item.deals, ...JSON.parse(elems)] } : item
      );
      return { ...prevData, board: updatedBoard };
    });
  }

  document.setListElem = (elems) => {
    setData({ ...data, list: { ...data?.list, elements: [...data?.list?.elements, ...JSON.parse(elems)] } });
  }

  document.setElemForStep = (id, elems) => {
    setData(prevData => {
      const updatedBoard = prevData.board.map(item =>
        item.id === id ? { ...item, deals: JSON.parse(elems) } : item
      );
      return { ...prevData, board: updatedBoard };
    });
  }

  document.setMenu = (array) => {
    setData({ ...data, menu: JSON.parse(array) })
  }

  // Get grabbed element
  document.getElem = () => {
    return (dragEnter)
  }

  document.setDragElemNull = () => {
    setDragEnter()
  }

  document.getPreviousStep = () => {
    return (dragEnter.step)
  }

  document.getNextStep = () => {
    return (dragOut.id)
  }

  document.getElemInfo = () => {
    console.log(dragEnter, dragEnter?.step, dragOut?.id)
    return(dragEnter, dragEnter?.step, dragOut?.id)
  }

  document.setLoader = (bool) => {
    setData({ ...data, loader: bool })
  }

  document.setListLoader = (bool) => {
    setData({ ...data, list: {...data.list, loader: bool}})
  }

  document.setBoardLoader = (id, bool) => {
    setData({ ...data, board: data?.board?.map((elem) => elem.id === id ? { ...elem, loader: bool } : {...elem}) })
  }

  document.setFilterLoader = (id, bool) => {
    setData({ ...data, filters: {...data.filters, filterList: data?.filters?.filterList?.map((elem) => elem?.id === id ? { ...elem, loader: bool } : {...elem})}})
  }

  document.setStartDate = (date) => {
    setData({...data, menu: {...data.menu, startDate: date}})
  }

  document.setEndDate = (date) => {
    setData({...data, menu: {...data.menu, endDate: date}})
  }
  // Перетаскать карточку
  // document.setDeal = (dealId, boardId, removeId) => {
  //   // Update the deals array and setCard for the specified dealId
  //   data.board.map((elem) => elem.deals.find((deal) => deal?.id === dealId && setCard(deal)))

  //   // Update the board array
  //   const updatedBoard = data.board.map((elem) => {
  //     if (elem?.id === boardId) {
  //       // Add the card to the deals array for the specified boardId
  //       return { ...elem, deals: [...elem.deals, card] };
  //     } else if (elem?.id === removeId) {
  //       // Remove the specified dealId from the deals array for the removeId
  //       const updatedDeals = elem.deals.filter((deal) => deal?.id !== dealId);
  //       return { ...elem, deals: updatedDeals };
  //     } else {
  //       return elem;
  //     }
  //   });

  //   // Set the updated data
  //   setData({ ...data, board: updatedBoard });
  // };
  
  const updateMenu = (value, id) => {
    console.log(value, id, "Valueid");
    setData((prevData) => ({
      ...prevData,
      menu: {
        ...prevData.menu,
        menuList: prevData.menu.menuList.map((menuElem) =>
          menuElem.value === value
            ? {
                ...menuElem,
                list: menuElem.list.map((elem) =>
                  elem.value === id
                    ? { ...elem, checked: true } // Set the selected item to `checked: true`
                    : { ...elem, checked: false } // Set all other items to `checked: false`
                ),
              }
            : menuElem // Leave other menu elements unchanged
        ),
      },
    }));
  };

  return (
      <div className="App">
        <Components {...data} setData={setData} updateMenu={updateMenu} setSelectedType={setSelectedType} setSelectedTask={setSelectedTask} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} setDate={document.setDate} />
      </div>
  )
}

export default App;
