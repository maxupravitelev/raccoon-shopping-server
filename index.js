require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const User = require('./models/user')
const List = require("./models/list");
// const request = require('request')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

/***** app.get routes */

app.get("/api/lists", (req, res, next) => {
  List.find({})
    .then((list) => {
      res.json(list);
    })
    .catch((error) => next(error));
});

app.get("/api/lists/:id", (req, res, next) => {
  List.findById(req.params.id)
    .then((list) => {
      res.json(list);
    })
    .catch((error) => next(error));
});


/***** app.post routes */

app.post('/api/new-user', (req, res) => {
    
    let userCount = 0;
    
      User.countDocuments({}, (error, count) => {
      userCount = count
    }).then(() => {
    
    let user = new User ({
      userId: userCount++
    })
    
    user.save().then((savedUser) => {
      res.json(savedUser)
    }).catch((error) => console.log(error))     
      
    }).catch((error) => console.log(error))
    
  })


  app.post('/api/new-item', function(req, res, next){
    
    let userId = req.body.userId 
    let text = req.body.text 
    let amount = req.body.amount 
    let date = req.body.date || Date.now();
    let isCompleted = req.body.isCompleted || 0;
    
   
    let update = {
      'userId': userId,
      'text': text,
      'amount': amount,
      'date': date,
      'isCompleted': isCompleted
    }
    
console.log(update)

    User.findById(req.body.userId, (err, user) => {
      
        const log = new List (update);
   
        log.save( (err, newLog) => {
          
          if (err) return next(err);
          res.json({
                userId:log.userId, 
                text: log.text, 
                amount: log.amount,
                date: log.date.toDateString(),
                isCompleted: isCompleted
            }); 
        });
        
      });
    
  });  



app.post("/api/lists", (req, res, next) => {
  const body = req.body;

  const list = new List({
    newItems: body.newItems,
  });

  list
    .save()
    .then((savedList) => {
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
    newItems: [
      {
        text: body.newItems[0].text,
      },
    ],
  };

  List.findByIdAndUpdate(request.params.id, list, { new: false })
    .then(([updatedList]) => {
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
