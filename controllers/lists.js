const listRouter = require("express").Router();
const List = require("../models/list")
const Item = require("../models/item")


///***** listRouter.get routes */


// find all lists
// listRouter.get("/api/lists", (req, res, next) => {
//   List.find({})
//     .then((list) => {
//       res.json(list);
//     })
//     .catch((error) => next(error));
// });



/* find all Item in List via listId */

listRouter.get("/:id", (req, res, next) => {
    Item.find({ listId: req.params.id })
      .then((list) => {
        res.json(list);
      })
      .catch((error) => next(error));
  });
  
  /***** listRouter.post routes */
  
  listRouter.post('/api/new-list', (req, res) => {
      
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


// listRouter.post("/api/lists", (req, res, next) => {
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

module.exports = listRouter