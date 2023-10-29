const getAllFields = require('../../controllers/fields/getAllFields');
const getFieldById = require('../../controllers/fields/getFieldById');
const createField = require('../../controllers/fields/createField');
const updateField = require('../../controllers/fields/updateField');
const deleteField = require('../../controllers/fields/deleteField');

const getAllFieldsHandler = async (req, res) => {
  try {
    const fields = await getAllFields();
    res.status(200).json(fields);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getFieldByIdHandler = async (req, res) => {
  try {
    const field = await getFieldById(req.params.id);

    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    } else {
      res.status(200).json(field);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createFieldHandler = async (req, res) => {
  try {
    const field = await createField(req.body);
    res.status(201).json(field);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateFieldHandler = async (req, res) => {
  try {
    const field = await updateField(req.params.id, req.body);
    res.status(200).json(field);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteFieldHandler = async (req, res) => {
  try {
    const field = await deleteField(req.params.id);
    res.status(200).json(field);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAllFieldsHandler,
  getFieldByIdHandler,
  createFieldHandler,
  updateFieldHandler,
  deleteFieldHandler
}
