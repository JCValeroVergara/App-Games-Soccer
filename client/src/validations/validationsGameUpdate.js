const validateSelectedDateAndSchedule = (date, schedule) => {
  const errors = {};

  if ((!date && schedule) || (date && !schedule)) {
    errors.fields = 'Debes Actualizar Fecha y Hora.';
  }

  return errors;
};
export default validateSelectedDateAndSchedule;
