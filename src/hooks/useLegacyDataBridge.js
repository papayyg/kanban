import { useEffect } from 'react';

export const useLegacyDataBridge = (setData, list) => {
    useEffect(() => {
        document.setTitles = (array) => {
            setData((prev) => ({ ...prev, list: { ...prev.list, titles: JSON.parse(array) } }));
        };

        document.setElements = (array) => {
            setData((prev) => ({ ...prev, list: { ...prev.list, elements: JSON.parse(array) } }));
        };

        document.setList = (array) => {
            setData((prev) => ({
                ...prev,
                list: {
                    ...prev.list,
                    elements: [...prev.list.elements, ...JSON.parse(array)],
                },
            }));
        };

        return () => {
            document.setTitles = null;
            document.setElements = null;
            document.setList = null;
        };
    }, [setData, list]);
};