const router = require('express').Router();

//Handlers
const { getAllFieldsHandler, getFieldByIdHandler, createFieldHandler, updateFieldHandler, deleteFieldHandler } = require('../../handlers/fields');

//Routes

router.get('/', getAllFieldsHandler);
router.get('/:id', getFieldByIdHandler);
router.post('/', createFieldHandler);
router.put('/:id', updateFieldHandler);
router.delete('/:id', deleteFieldHandler);

module.exports = router;
