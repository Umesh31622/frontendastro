

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const events = {
    "2025-10-15": ["Call with John Doe", "Upload PDF A12"],
    "2025-10-16": ["Follow-up with Jane Smith"]
  };

  const formattedDate = date.toISOString().split("T")[0];
  const dayEvents = events[formattedDate] || [];

  return (
    <div className="calendar-container">
      <h3>Upcoming Calls / Follow-ups</h3>
      <Calendar onChange={setDate} value={date} />
      <p className="selected-date">Selected Date: {date.toDateString()}</p>
      {dayEvents.length > 0 && (
        <ul>
          {dayEvents.map((event, i) => (
            <li key={i}>📌 {event}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
