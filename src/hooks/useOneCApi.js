import { useEffect } from 'react';

const safeJsonParse = (jsonString) => {
    if (typeof jsonString !== 'string') return jsonString;
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from 1C:", e);
        return null;
    }
};

export const useOneCApi = (
    setData,
    getDragEnter,
    getDragOut
) => {
    useEffect(() => {
        window.setDataObject = (string) => {
            const dataObject = safeJsonParse(string);
            if (dataObject) setData(dataObject);
        };
        document.setDataObject = window.setDataObject;

        document.setData = (json) => setData(safeJsonParse(json));
        document.setMenu = (array) => setData(prev => ({ ...prev, menu: safeJsonParse(array) }));
        document.setType = (type) => setData(prev => ({ ...prev, menu: { ...prev.menu, type: safeJsonParse(type) } }));
        document.showManager = (bool) => setData(prev => ({ ...prev, menu: { ...prev.menu, showManager: bool } }));
        document.showResponsible = (bool) => setData(prev => ({ ...prev, menu: { ...prev.menu, showResponsible: bool } }));
        document.setDate = (startDate, endDate) => setData(prev => ({ ...prev, menu: { ...prev.menu, startDate, endDate } }));
        document.setStartDate = (date) => setData(prev => ({ ...prev, menu: { ...prev.menu, startDate: date } }));
        document.setEndDate = (date) => setData(prev => ({ ...prev, menu: { ...prev.menu, endDate: date } }));

        document.showFilters = (bool) => setData(prev => ({ ...prev, filters: { ...prev.filters, show: bool } }));
        document.setFilters = (id, array) => setData(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                filterList: (prev.filters.filterList || []).map(f => f.id === id ? { ...f, options: safeJsonParse(array) } : f)
            }
        }));
        document.setFilter = (value, label, id) => setData(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                filterList: (prev.filters.filterList || []).map(f => f.id === id ? { ...f, selectedValue: value, selectedLabel: label } : f)
            }
        }));
        document.addFilters = (id, array) => setData(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                filterList: (prev.filters.filterList || []).map(f => f.id === id ? { ...f, options: [...(f.options || []), ...safeJsonParse(array)] } : f)
            }
        }));

        document.setElem = (id, elems) => setData(prev => ({
            ...prev,
            board: (prev.board || []).map(item => item.id === id ? { ...item, deals: [...(item.deals || []), ...safeJsonParse(elems)] } : item)
        }));
        document.setElemForStep = (id, elems) => setData(prev => ({
            ...prev,
            board: (prev.board || []).map(item => item.id === id ? { ...item, deals: safeJsonParse(elems) } : item)
        }));
        document.setListElem = (elems) => setData(prev => ({
            ...prev,
            list: { ...prev.list, elements: [...(prev.list.elements || []), ...safeJsonParse(elems)] }
        }));

        document.setLoader = (bool) => setData(prev => ({ ...prev, loader: bool }));
        document.setListLoader = (bool) => setData(prev => ({ ...prev, list: { ...prev.list, loader: bool } }));
        document.setBoardLoader = (id, bool) => setData(prev => ({
            ...prev,
            board: (prev.board || []).map(elem => elem.id === id ? { ...elem, loader: bool } : elem)
        }));
        document.setFilterLoader = (id, bool) => setData(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                filterList: (prev.filters.filterList || []).map(elem => elem.id === id ? { ...elem, loader: bool } : elem)
            }
        }));

        document.getElem = () => getDragEnter();
        document.getPreviousStep = () => getDragEnter() && getDragEnter().step;
        document.getNextStep = () => getDragOut() && getDragOut().id;
        document.getElemInfo = () => console.log({ dragEnter: getDragEnter(), dragOut: getDragOut() });

        document.setColumns = (array) => setData(prev => ({ ...prev, columns: safeJsonParse(array) }));


        if (document.getElementById("action_trigger_main")) {
            document.action_container = '{"action": "initialize_form"}';
            document.getElementById("action_trigger_main").click();
        }

        return () => {
        }
    }, []);
};