import React from 'react'

const BoardTitle = (elem) => {
  return (
    <div className='board_title flex a-center j-center column' style={{ borderBottom: `4px solid ${elem.borderColor}` }} key={elem.title}>
      <p>{elem.title}</p>
      <span>{elem.dealAmount} сделок: {elem.costAmount} руб.</span>
    </div>
  )
}

export default BoardTitle