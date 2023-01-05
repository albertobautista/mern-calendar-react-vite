export const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{user?.name}</strong>
      <span> - {title}</span>
    </>
  );
};
