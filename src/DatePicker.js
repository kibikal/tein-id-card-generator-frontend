import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

function DatePicker() {
    const [selectedDate, setSelectedDate]=useState(null)
  return (
    <div>
      <ReactDatePicker 
        selected={selectedDate}
        onChange={date=>setSelectedDate(date)}
        dateFormat = "dd/MM/yyyy"
      />
    </div>
  );
}

export default DatePicker;
