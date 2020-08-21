require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const List = require('./models/list')
const Item = require("./models/item");
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

///***** app.get routes */


// find all lists
// app.get("/api/lists", (req, res, next) => {
//   List.find({})
//     .then((list) => {
//       res.json(list);
//     })
//     .catch((error) => next(error));
// });



/* find all Item in List via listId */

app.get("/api/lists/:id", (req, res, next) => {
  Item.find({ listId: req.params.id })
    .then((list) => {
      res.json(list);
    })
    .catch((error) => next(error));
});

/***** app.post routes */

app.post('/api/new-list', (req, res) => {
    
    let listCount = 0;
    
      List.countDocuments({}, (error, count) => {
      listCount = count
    }).then(() => {
    
    let list = new List ({
      listId: listCount++
    })
    
    list.save().then((savedUser) => {
      res.json(savedUser)
    }).catch((error) => console.log(error))     
      
    }).catch((error) => console.log(error))
    
  })


  app.post('/api/new-item',  (req, res, next) => {
    
    let listId = req.body.listId 
    let text = req.body.text 
    let amount = req.body.amount 
    let date = req.body.date || Date.now();
    let isCompleted = req.body.isCompleted || 0;
    
   
    let update = {
      'listId': listId,
      'text': text,
      'amount': amount,
      'date': date,
      'isCompleted': isCompleted
    }
    
    console.log(update)

    List.findById(req.body.listId, (err, list) => {
      
        const item = new Item (update);
   
        item.save( (err, newLog) => {
          
          if (err) return next(err);
          res.json({
                listId: item.listId, 
                text: item.text, 
                amount: item.amount,
                date: item.date.toDateString(),
                isCompleted: isCompleted
            }); 
        });
        
      });
    
  });  



// app.post("/api/lists", (req, res, next) => {
//   const body = req.body;

//   const item = new Item({
//     newItems: body.newItems,
//   });

//   list
//     .save()
//     .then((savedList) => {
//       res.json(savedList);
//     })
//     .catch((error) => next(error));
// });


///* app.delete routes */

/* delete item */

app.delete("/api/items/:id", (request, response, next) => {
  Item.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});


///* app.put routes*/ 

// app.put("/api/items/:id", (request, response, next) => {
//   const body = request.body;

//   const item = {
//     news: [
//       {
//         text: body.newItems[0].text,
//       },
//     ],
//   };

//   List.findByIdAndUpdate(request.params.id, item, { new: false })
//     .then(([updatedList]) => {
//       response.json(updatedList);
//     })
//     .catch((error) => next(error));
// });

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
