const itemRouter = require('express').Router()
const { response } = require('../app')
const Item = require('../models/item')
const List = require('../models/list')


// errors are handled with 'express-async-errors' @app.js; no try/catch blocks & next necessary

/* .get routes */

/* .post routes */

itemRouter.post('/new-item', (request, response) => {
  let listId = request.body.listId
  let text = request.body.text
  let amount = request.body.amount
  let date = request.body.date || Date.now()
  let isCompleted = request.body.isCompleted || 0
  let itemId = request.body.itemId

  if (text == undefined) {
    return response.status(400).end()
  }

  let update = {
    listId: listId,
    text: text,
    amount: amount,
    date: date,
    isCompleted: isCompleted,
    itemId: itemId,
  }

  List.findById(request.body.listId, async (err, list) => {
    const item = new Item(update)

    const savedItem = await item.save()
    console.log(savedItem)
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
