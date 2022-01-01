// Code referred - https://www.bezkoder.com/node-express-mongodb-crud-rest-api/ 
const express = require('express');

const businessLogic = require('./businessLogic');

const router = express.Router();

router.get('/', businessLogic.findAll);

router.post('/', businessLogic.addBook);

router.delete('/:id', businessLogic.deleteBook);

module.exports = router;