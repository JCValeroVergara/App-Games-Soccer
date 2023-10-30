
const validation = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Debes incluir tu nombre';
  }

  if (!data.phone) {
    errors.phone = 'Debes incluir el numero telefónico';
  }

  if (!data.position) {
    errors.position = 'Debes incluir la posición de juego';
  }

  if (!data.teamId) {
    errors.teamId = 'Debes seleccionar un equipo';
  }

  return errors;
};

export default validation;
