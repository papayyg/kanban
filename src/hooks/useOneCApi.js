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
    setDragEnter,
    getDragEnter,
    getDragOut
) => {
    useEffect(() => {
        const methodNames = [
            'setFilterHeaders', 'setDataObject', 'setData', 'setMenu', 'setType', 'showManager', 'showResponsible',
            'setDate', 'setStartDate', 'setEndDate', 'setColumns', 'showFilters', 'setFilters',
            'setFilter', 'addFilters', 'setElem', 'setElemForStep', 'setListElem', 'getElem',
            'getPreviousStep', 'getNextStep', 'getElemInfo', 'setDragElemNull', 'setLoader',
            'setListLoader', 'setBoardLoader', 'setFilterLoader'
        ];

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
        document.setColumns = (array) => setData(prev => ({ ...prev, columns: safeJsonParse(array) }));

        // --- Управление фильтрами ---
        document.setFilterHeaders = (filterHeaders) => {
            const headers = safeJsonParse(filterHeaders);
            if (headers && Array.isArray(headers)) {
                setData(prev => ({
                    ...prev,
                    filters: {
                        ...prev.filters,
                        show: true,
                        filterList: headers.map(header => ({
                            id: header.id,
                            title: header.title,
                            options: [],
                            selectedValue: null,
                            selectedLabel: null,
                            loader: false
                        }))
                    }
                }));
            }
        };
        document.showFilters = (bool) => setData(prev => ({ ...prev, filters: { ...prev.filters, show: bool } }));
        document.setFilters = (id, array) => setData(prev => ({ ...prev, filters: { ...prev.filters, filterList: (prev.filters?.filterList || []).map(f => f.id === id ? { ...f, options: safeJsonParse(array) } : f) } }));
        document.setFilter = (value, label, id) => setData(prev => ({ ...prev, filters: { ...prev.filters, filterList: (prev.filters?.filterList || []).map(f => f.id === id ? { ...f, selectedValue: value, selectedLabel: label } : f) } }));
        document.addFilters = (id, array) => setData(prev => ({ ...prev, filters: { ...prev.filters, filterList: (prev.filters?.filterList || []).map(f => f.id === id ? { ...f, options: [...(f.options || []), ...safeJsonParse(array)] } : f) } }));

        // --- Управление элементами ---
        document.setElem = (id, elems) => setData(prev => ({ ...prev, board: (prev.board || []).map(item => item.id === id ? { ...item, deals: [...(item.deals || []), ...safeJsonParse(elems)] } : item) }));
        document.setElemForStep = (id, elems) => setData(prev => ({ ...prev, board: (prev.board || []).map(item => item.id === id ? { ...item, deals: safeJsonParse(elems) } : item) }));
        document.setListElem = (elems) => setData(prev => ({ ...prev, list: { ...prev.list, elements: [...(prev.list?.elements || []), ...safeJsonParse(elems)] } }));

        // --- Управление Drag & Drop ---
        document.getElem = getDragEnter;
        document.getPreviousStep = () => getDragEnter()?.step;
        document.getNextStep = () => getDragOut()?.id;
        document.getElemInfo = () => console.log({ dragEnter: getDragEnter(), dragOut: getDragOut() });
        document.setDragElemNull = () => setDragEnter(null);

        // --- Управление лоадерами ---
        document.setLoader = (bool) => setData(prev => ({ ...prev, loader: bool }));
        document.setListLoader = (bool) => setData(prev => ({ ...prev, list: { ...prev.list, loader: bool } }));
        document.setBoardLoader = (id, bool) => setData(prev => ({ ...prev, board: (prev.board || []).map(elem => elem.id === id ? { ...elem, loader: bool } : elem) }));
        document.setFilterLoader = (id, bool) => setData(prev => ({ ...prev, filters: { ...prev.filters, filterList: (prev.filters?.filterList || []).map(elem => elem.id === id ? { ...elem, loader: bool } : elem) } }));

        const trigger = document.getElementById("action_trigger_main");
        if (trigger) {
            document.action_container = '{"action": "initialize_form"}';
            trigger.click();
        }

        // --- ВАЖНО: Функция очистки ---
        // Этот код выполнится, когда компонент будет удален со страницы.
        // Он убирает все созданные нами функции из document, чтобы не оставлять "мусора".
        return () => {
            methodNames.forEach(name => {
                document[name] = undefined;
            });
        };
    }, [setData, setDragEnter, getDragEnter, getDragOut]);
};