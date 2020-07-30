require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const List = require("./models/list");

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};



app.use(requestLogger);



app.get("/api/lists", (req, res, next) => {
  List.find({}).then((list) => {
    res.json(list);
  }).catch((error) => next(error));
});

app.get("/api/lists/:id", (req, res, next) => {
  List.findById(req.params.id).then((list) => {
    res.json(list);
  }).catch((error) => next(error));
});

app.post("/api/lists", (req, res, next) => {
  const body = req.body;

  const list = new List({
    newItems: body.newItems,
  });

  list.save().then((savedList) => {
    res.json(savedList);
  })
  .catch((error) => next(error));
});

app.delete("/api/lists/:id", (request, response, next) => {
    List.findByIdAndRemove(request.params.id)
    .then((result) => {
        response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/lists/:id", (request, response, next) => {
    const body = request.body;
  
    const list = {
        newItems: [{
            text: body.newItems[0].text
        }],
      };
  
    List.findByIdAndUpdate(request.params.id, list, { new: false })
      .then(([updatedList,]) => {
        response.json(updatedList);
      })
      .catch((error) => next(error));


    // List.findByIdAndUpdate(request.params.id, list, { new: true })
    //   .then((updatedList) => {
    //     response.json(updatedList);
    //   })
    //   .catch((error) => next(error));
  });


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
  };
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint);
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    }
  
    next(error);
  };
  
  app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// built upon: https://fullstackopen.com/en/part3/
