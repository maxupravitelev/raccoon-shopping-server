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

// let lists = [

//     {
//       id: 1,
//       listId: 1,
//       newItems: [
//         {
//           id: 1,
//           text: "T-Rex",
//           amount: 2,
//           price: 1250,
//           isCompleted: false,
//         },
//         {
//           id: 2,
//           text: "Eggs",
//           amount: 5,
//           price: 1,
//           isCompleted: false,
//         },
//         {
//           id: 3,
//           text: "Bananas",
//           amount: 24,
//           price: 2,
//           isCompleted: false,
//         },
//       ],
//     },
//     {
//         newItems: [
//         {
//           text: "Cookies",
//           amount: "4",
//           isCompleted: false,
//         },
//         {
//           text: "Cookies",
//           amount: "4",
//           isCompleted: true,
//         },
//       ],
//       id: 2,
//     },
//     {
//         newItems: [
//         {
//           text: "Cookies",
//           amount: "2",
//           isCompleted: false,
//         },
//       ],
//       id: 3,
//     },

// ];

app.get("/api/lists", (req, res) => {
  List.find({}).then((list) => {
    res.json(list);
  });
});

app.get("/api/lists/:id", (req, res) => {
  List.findById(req.params.id).then((list) => {
    res.json(list);
  });
});

app.post("/api/lists", (req, res) => {
  const body = req.body;

  const list = new List({
    newItems: body.newItems,
  });

  list.save().then((savedList) => {
    res.json(savedList);
  });
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
  
    // const list = {
    //   name: body.name,
    //   number: body.number,
    // };
  
    List.findByIdAndUpdate(request.params.id, list, { new: true })
      .then((updatedList) => {
        response.json(updatedList);
      })
      .catch((error) => next(error));
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
