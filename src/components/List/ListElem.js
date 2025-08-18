import React from 'react';

const ListElem = ({ elem, onRowClick }) => {
    const getCellStyle = (el) => {
        if (el?.whiteSpace) {
            return { whiteSpace: "normal", minWidth: "270px", maxWidth: "270px" };
        }
        if (el?.label?.length > 40) {
            return { whiteSpace: "unset" };
        }
        return {};
    };

    return (
        <tr className='list_elem' onClick={() => onRowClick(elem?.href)}>
            {elem?.details?.map((el, index) => (
                <td className='list_elem-info' key={index} style={getCellStyle(el)}>
                    {el?.label}
                </td>
            ))}
            {elem?.more?.map((el, index) => (
                <td className='list_elem-info' key={index} style={getCellStyle(el)}>
                    {el?.label}
                </td>
            ))}
        </tr>
    );
};

export default ListElem;