const validation = (GameData) => {
  const errors = {};

  if (!GameData.date) {
    errors.fields = 'Debes definir la fecha y hora del partido';
  }

  if (!GameData.teamHomeId) {
    errors.fields = 'Debes  elegir el equipo local';
  }

  if (!GameData.teamAwayId) {
    errors.fields = 'Debes elegir el equipo visitante';
  }
  if (!GameData.fieldId) {
    errors.fields = 'Debes elegir la cancha';
  }

  return errors;
};

export default validation;
