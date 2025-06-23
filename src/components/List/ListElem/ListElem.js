import React from 'react'

const ListElem = ({elem}) => {
    const handleApply = (href) => {
        document.action_container = `${href}`;
        console.log(document.action_container);
        document.getElementById("action_trigger_main").click();
    };
    return (
        <tr className='list_elem' href={elem.href} onClick={(e) => {e.preventDefault();handleApply(elem?.href)}}>
            {elem?.details?.map((el, index) => (
                <td className='list_elem-info' key={index} style={el?.label?.length > 40 ? {whiteSpace: "unset"} : {}}>
                    {el?.label}
                </td>
            ))}
            {elem?.more?.map((el, index) => (
                <td className='list_elem-info' key={index} style={el?.whiteSpace ? {whiteSpace: "normal", minWidth:"270px", maxWidth:"270px"} : el?.label?.length > 40 ? {whiteSpace: "unset"} : {}}>
                    {el?.label}
                </td>
            ))}
        </tr>
    )
}

export default ListElem