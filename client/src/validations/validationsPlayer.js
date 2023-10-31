
const validation = (PlayerData) => {
  const errors = {};

  if (!PlayerData.name) {
    errors.fields = 'Debes incluir tu nombre';
  }

  if (!PlayerData.phone) {
    errors.fields = 'Debes incluir el número telefónico';
  }

  if (!PlayerData.position) {
    errors.fields = 'Debes incluir la posición de juego';
  }

  if (!PlayerData.teamId) {
    errors.fields = 'Debes seleccionar un equipo';
  }

  return errors;
};

export default validation;