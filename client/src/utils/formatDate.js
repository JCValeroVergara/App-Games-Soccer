import moment from 'moment';

function formatDateTime(dateTimeString) {
  const dateTime = moment(dateTimeString).local();
  const formattedDate = dateTime.format('YYYY-MM-DD');
  const formattedTime = dateTime.format('HH:mm');

  return { formattedDate, formattedTime };
}

const formatDateForDB = (date, time) => {
  let formattedDate = '';
  if (date && time) {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const dateTime = moment()
      .local()
      .set({
        year: year,
        month: month - 1,
        date: day,
        hour: hours,
        minute: minutes,
        second: 0,
      });
    formattedDate = dateTime.toISOString();
  }
  return formattedDate;
};


export { formatDateTime, formatDateForDB };
