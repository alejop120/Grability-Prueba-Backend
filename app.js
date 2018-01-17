var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
// api
var apiRoute = require('./routes/api/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


app.use(bodyParser.json());
app.use('/api', apiRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`)
})