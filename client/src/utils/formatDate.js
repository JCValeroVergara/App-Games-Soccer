function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');

  // Renderiza la fecha y hora en el formato deseado
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}

const formatDateForDB = (date, time) => {
  let formattedDate = '';
  if (date && time) {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
  }
  return formattedDate;
};

export { formatDateTime, formatDateForDB };
