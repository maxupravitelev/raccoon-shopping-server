const listRouter = require('express').Router()
const List = require('../models/list')
const Item = require('../models/item')


///***** .get routes */

/* .get all lists */

// not finished
// listRouter.get("/api/lists", (req, res, next) => {
//   List.find({})
//     .then((list) => {
//       res.json(list);
//     })
//     .catch((error) => next(error));
// });


/* .get all Items in List via listId */

listRouter.get('/:id', async (request, response) => {
  const list = await Item.find({ listId: request.params.id })
  response.json(list)

})

///***** .post routes */

/* .post new list; create new list*/
listRouter.post('/new-list', (req, res) => {

  let listCount = 0

  List.countDocuments({}, (error, count) => {
    listCount = count
    console.log(listCount)
  }).then(() => {

    let list = new List ({
      listId: listCount++
    })
    console.log(list)
    list.save().then((newList) => {
      res.json(newList)
    }).catch((error) => console.log(error))

  }).catch((error) => console.log(error))

})


/* .post */

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