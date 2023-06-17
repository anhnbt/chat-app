const express = require('express')
const router = express.Router()
// controllers
const users = require('../controllers/userController');

router
    .get('/', users.getAllData)
    .post('/', users.createData)
    .put('/:id', users.updateData)
    .get('/:id', users.getDataById)
    .delete('/:id', users.deleteData)

module.exports = router;
