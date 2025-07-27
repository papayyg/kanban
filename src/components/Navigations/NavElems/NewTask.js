import React from 'react'

const NewTask = (button) => {
  return (
    <button className={`new_task flex a-center`} id={button?.value} onClick={e => e.preventDefault()}>
      Новая сделка
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clipPath="url(#clip0_5564_166152)">
          <rect x="0.7" y="0.7" width="14.6" height="14.6" rx="7.3" stroke="#127CCA" strokeWidth="1.4" />
          <path d="M8.70122 4.70125C8.70122 4.31396 8.38726 4 7.99997 4C7.61268 4 7.29872 4.31396 7.29872 4.70125V7.29869L4.70121 7.29875C4.31392 7.29876 3.99998 7.61272 4 8.00001C4.00002 8.3873 4.31399 8.70125 4.70128 8.70125L7.29872 8.70119V11.2988C7.29872 11.686 7.61268 12 7.99997 12C8.38726 12 8.70122 11.686 8.70122 11.2988V8.70116L11.2988 8.7011C11.6861 8.70109 12 8.38713 12 7.99984C12 7.61255 11.686 7.29859 11.2987 7.2986L8.70122 7.29866V4.70125Z" fill="#127CCA" />
        </g>
        <defs>
          <clipPath id="clip0_5564_166152">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default NewTask