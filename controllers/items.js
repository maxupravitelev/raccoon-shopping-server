const itemRouter = require("express").Router();
const Item = require("../models/item");
const List = require("../models/list");


// errors are handled with 'express-async-errors' @app.js; no try/catch blocks & next necessary

/* .get routes */

/* .post routes */

itemRouter.post("/new-item", (req, res, next) => {
  let listId = req.body.listId;
  let text = req.body.text;
  let amount = req.body.amount;
  let date = req.body.date || Date.now();
  let isCompleted = req.body.isCompleted || 0;
  let itemId = req.body.itemId;

  let update = {
    listId: listId,
    text: text,
    amount: amount,
    date: date,
    isCompleted: isCompleted,
    itemId: itemId,
  };

  // console.log(update)

  List.findById(req.body.listId, (err, list) => {
    const item = new Item(update);

    item.save((err, newLog) => {
      if (err) return next(err);
      // console.log(item)
      res.json({
        listId: item.listId,
        text: item.text,
        amount: item.amount,
        date: item.date.toDateString(),
        isCompleted: isCompleted,
        itemId: item["_id"],
      });
    });
  });
});

/* delete routes */

itemRouter.delete("/:id", async (request, response) => {
  
  await Item.findByIdAndRemove(request.params.id) 
  response.status(204).end();

});

/* .put routes */

itemRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const item = {
    isCompleted: body.isCompleted
  };

  let updatedItem = await Item.findByIdAndUpdate(request.params.id, item, { new: true })
  response.json({isCompleted: updatedItem.isCompleted});  
  
});

// itemRouter.put("/api/items/:id", (request, response, next) => {
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

module.exports = itemRouter;
