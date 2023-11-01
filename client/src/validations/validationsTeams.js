const validation = (TeamData) => {
  let errors = {};

  if (!TeamData.name) {
    errors.fields = "Debes incluir un nombre";
  }

  if (!TeamData.city) {
    errors.fields = "Debes incluir una ciudad";
  }

  if (!TeamData.neighborhood) {
    errors.fields = "Debes incluir un barrio";
  }

  if (!TeamData.manager) {
    errors.fields = "Debes incluir un manager";
  }

  if (!TeamData.managerPhone) {
    errors.fields = "Debes incluir un teléfono";
  }


  return errors;
}

export default validation;