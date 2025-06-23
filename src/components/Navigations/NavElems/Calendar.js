import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // Import Russian locale

// Register the Russian locale
registerLocale('ru', ru);

const DateRangePicker = ({ startDay, endDay }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(startDay);
  }, [startDay]);

  useEffect(() => {
    setEndDate(endDay);
  }, [endDay]);

  const handleDateChange = (dates) => {
    document.action_container = `{"date": ${JSON.stringify(dates)}}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();

    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClearDates = (e) => {
    e.preventDefault()
    setStartDate(null);
    setEndDate(null);
    document.action_container = `{"date": ""}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
  };

  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        popperClassName="zIndexBig"
        dateFormat="yyyy-MM-dd" // Use the 1C-compatible format
        placeholderText="Выберите диапазон дат"
        locale="ru" // Apply Russian localization
      />
      
      {/* Clear button (X) */}
      <button 
        className="clear-button" 
        id='clear_calendar'
        onClick={handleClearDates} 
        style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer" }}
      >
        <svg data-v-00e70212="" height="9" width="9" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.195.205a.7.7 0 1 0-.99.99l2.899 2.899L.206 6.99a.7.7 0 0 0 .99.99l2.898-2.897 2.898 2.898a.7.7 0 1 0 .99-.99L5.084 4.094 7.98 1.196a.7.7 0 1 0-.99-.99L4.094 3.104 1.195.205Z"></path></svg>
      </button>
    </div>
  );
};

export default DateRangePicker;
