import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns/esm";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent, CalendarModal } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";

const events = [
  {
    title: "Cumple del jefe",
    notes: "Comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#316767",
    user: {
      _id: "123",
      name: "Alberto",
    },
  },
];
export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#316767",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };

  const onSelect = (event) => {
    console.log({ select: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    console.log({ change: event });
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={lastView}
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
