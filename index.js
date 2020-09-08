
// const mongoose = require('mongoose')

const app = require('./app') 
const http = require('http')

const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


/* */



// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require('body-parser')
// const List = require('./models/list')
// const Item = require("./models/item");
// const request = require('request')

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);




  







// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// // handler of requests with unknown endpoint
// app.use(unknownEndpoint);

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   }

//   next(error);
// };

// app.use(errorHandler);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// built upon: https://fullstackopen.com/en/part3/
