import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const SchedulingDashboard = () => {
  const events = [
    {
      title: "Therapy Session",
      start: new Date(),
      end: new Date(),
    },
  ];

  return (
    <div className="scheduling-dashboard">
      <h2>Manage Appointments</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default SchedulingDashboard;