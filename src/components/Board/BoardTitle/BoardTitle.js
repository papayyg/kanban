import React from 'react'

const BoardTitle = (elem) => {
  return (
    <div className='board_title board_filter_title flex a-center j-center column' style={{ borderBottom: `4px solid ${elem.borderColor}` }} key={elem.title}>
      <p 
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          width: '100%'
        }}
        title={elem.title}
      >
        {elem.title}
      </p>
      <span>{elem.dealAmount ?? 0} сделок: {elem.costAmount ?? 0} руб.</span>
    </div>
  )
}

export default BoardTitle