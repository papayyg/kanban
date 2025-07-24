import Components from './components/Components';
import './App.css';
import { useState, useEffect } from 'react';
import Loader from './Loader';

function App() {
  const [data, setData] = useState({});
  const [card, setCard] = useState()
  const [dragEnter, setDragEnter] = useState()
  const [dragOut, setDragOut] = useState()
  const [showFilter, setShowFilter] = useState()
  const [selectedType, setSelectedType] = useState("Kanban");

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
      const DataObject = JSON.parse(string);
      setData(DataObject);
    };
    window.setDataObject = setDataObject;
    document.setDataObject = window.setDataObject;
    document.action_container = '{"action": "initialize_form"}';
    document.getElementById("action_trigger_main").click();
  }, []);

  console.log(data, "data")

  // functions
  // Тип канбана
  document.setData = (json) => {
    setData(JSON.parse(json))
  }

  document.setType = (type) => {
    setData({ ...data, menu: { ...data.menu, type: JSON.parse(type) } })
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
  }

  document.setLoader = (bool) => {
    console.log("loader triggered")
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
        <Components {...data} setData={setData} updateMenu={updateMenu} selectedType={selectedType} setSelectedType={setSelectedType}setSelectedTask={setSelectedTask} setDragEnter={setDragEnter} setDragOut={setDragOut} dragElem={dragElem} setDate={document.setDate} loader2={data?.loader}/>
      </div>
  )
}

export default App;
