import React from 'react'

const ListElem = ({elem}) => {
  return (
    <div className='list_elem flex'>
        <div className='list_elem-info'>
            {elem.name}
        </div>
        <div className='list_elem-info'>
            {elem.responsible}
        </div>
        <div className='list_elem-info'>
            {elem.step}
        </div>
        <div className='list_elem-info'>
            {elem.date}
        </div>
        <div className='list_elem-info'>
            {elem.client}
        </div>
        <div className='list_elem-info'>
            {elem.appealType}
        </div>
        <div className='list_elem-info'>
            {elem.appartment}
        </div>
        <div className='list_elem-info'>
            {elem.cost}
        </div>
        <div className='list_elem-info'>
            {elem.area}
        </div>
        <div className='list_elem-info'>
            {elem.manager}
        </div>
        {elem?.more?.map((el) => (
        <div className='list_elem-info'>
            {el.label}
        </div>
        ))}
    </div>
  )
}

export default ListElem