const itemRouter = require('express').Router()
const { response } = require('../app')
const Item = require('../models/item')
const List = require('../models/list')


// errors are handled with 'express-async-errors' @app.js; no try/catch blocks & next necessary

/* .get routes */

/* .post routes */

itemRouter.post('/new-item', (request, response) => {
  if (request.body.text === undefined) {
    return response.status(400).end()
  }

  let update = {
    listId: request.body.listId,
    text: request.body.text,
    amount: request.body.amount,
    date: request.body.date || Date.now(),
    isCompleted: request.body.isCompleted || 0,
    itemId: request.body.itemId,
  }

  List.findById(request.body.listId, async () => {
    const item = new Item(update)

    const savedItem = await item.save()
    // console.log(savedItem)
    response.json(savedItem)

    // item.save((err, newLog) => {
    //   if (err) return next(err);
    //   res.json({
    //     listId: item.listId,
    //     text: item.text,
    //     amount: item.amount,
    //     date: item.date.toDateString(),
    //     isCompleted: isCompleted,
    //     itemId: item["_id"],
    //   });
    // });
  })
})

/* delete routes */

itemRouter.delete('/:id', async (request, response) => {

  await Item.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

/* .put routes */

itemRouter.put('/:id', async (request, response) => {
  const body = request.body

  const item = {
    isCompleted: body.isCompleted
  }

  let updatedItem = await Item.findByIdAndUpdate(request.params.id, item, { new: true })
  response.json({ isCompleted: updatedItem.isCompleted })

})

module.exports = itemRouter
