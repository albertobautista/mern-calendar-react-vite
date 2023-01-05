import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    console.log("setActiveEvent");
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: LLegar al backend
    //TODO: Todo bien

    if (calendarEvent._id) {
      //* Update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //* Create
      dispatch(onAddNewEvent({ ...calendarEvent, _uid: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
