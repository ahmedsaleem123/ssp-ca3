// Tutorial referred: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Refer to the routes
const routes = require('./routes');
app.use('/api/books', routes);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
