const validation = (FieldData) => {
  const errors = {};

  if (!FieldData.name) {
    errors.fields = 'Debes incluir tu nombre';
  }

  if (!FieldData.city) {
    errors.fields = 'Debes incluir la ciudad';
  }

  if (!FieldData.neighborhood) {
    errors.fields = 'Debes incluir el barrio';
  }

  if (!FieldData.address) {
    errors.fields = 'Debes seleccionar la dirección';
  }
  if (!FieldData.phone) {
    errors.fields = 'Debes incluir el número telefónico';
  }

  return errors;
};

export default validation;
