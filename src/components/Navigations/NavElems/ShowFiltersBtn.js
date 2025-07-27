import React, { useEffect } from 'react'

const ShowFiltersBtn = ({ showFiltersBtn }) => {
  useEffect(() => {
    const showBtn = document.getElementById("showBtn");
    showBtn.style.cursor = 'pointer';
  }, []);

  return (
    <button title='Фильтры' className={`default_btn show_btn`} id='showBtn' onClick={(e) => { e.preventDefault() }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 11C10.6569 11 12 9.65685 12 8C12 6.34315 10.6569 5 9 5C7.62019 5 6.45794 5.93153 6.10785 7.2H3.8C3.35817 7.2 3 7.55817 3 8C3 8.44183 3.35817 8.8 3.8 8.8H6.10785C6.45794 10.0685 7.62019 11 9 11ZM9 9.4C9.7732 9.4 10.4 8.7732 10.4 8C10.4 7.2268 9.7732 6.6 9 6.6C8.2268 6.6 7.6 7.2268 7.6 8C7.6 8.7732 8.2268 9.4 9 9.4Z" fill="#127CCA" />
        <path d="M11.8922 8.8C11.9625 8.54531 12 8.27704 12 8C12 7.72296 11.9625 7.45469 11.8922 7.2H20.2C20.6418 7.2 21 7.55817 21 8C21 8.44183 20.6418 8.8 20.2 8.8H11.8922Z" fill="#127CCA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 19C13.3431 19 12 17.6569 12 16C12 14.3431 13.3431 13 15 13C16.3798 13 17.5421 13.9315 17.8922 15.2H20.2C20.6418 15.2 21 15.5582 21 16C21 16.4418 20.6418 16.8 20.2 16.8H17.8922C17.5421 18.0685 16.3798 19 15 19ZM15 17.4C14.2268 17.4 13.6 16.7732 13.6 16C13.6 15.2268 14.2268 14.6 15 14.6C15.7732 14.6 16.4 15.2268 16.4 16C16.4 16.7732 15.7732 17.4 15 17.4Z" fill="#127CCA" />
        <path d="M12.1078 16.8C12.0375 16.5453 12 16.277 12 16C12 15.723 12.0375 15.4547 12.1078 15.2H3.8C3.35817 15.2 3 15.5582 3 16C3 16.4418 3.35817 16.8 3.8 16.8H12.1078Z" fill="#127CCA" />
      </svg>
    </button>
  )
}

export default ShowFiltersBtn