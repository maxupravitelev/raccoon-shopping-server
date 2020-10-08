const itemRouter = require('express').Router()
const { response } = require('../app')
const Item = require('../models/item')
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/list')
const List = require('../models/list')


// errors are handled with 'express-async-errors' @app.js; no try/catch blocks & next necessary

/* .get routes */

/* .post routes */

itemRouter.post('/new-item', async (request, response) => {
  if (request.body.text === undefined) {
    return response.status(400).end()
  }
  let containingList = await List.findOne({ listId: request.body.listId })

  let update = {
    listId: request.body.listId,
    text: request.body.text,
    amount: request.body.amount,
    date: request.body.date || Date.now(),
    isCompleted: request.body.isCompleted || 0,
    itemId: request.body.itemId,
    //added
    unitType: request.body.unitType,
    productPrice: request.body.productPrice,
    productCurrency: request.body.productCurrency,
    productTextNote: request.body.productTextNote,
    productVoiceNote: request.body.productVoiceNote,
    productImage: request.body.productImage,
    ean: request.body.ean,
    mongoListId: containingList._id,
  }
  const item = new Item(update)
  const savedItem = await item.save()
  containingList.items = containingList.items.concat(savedItem._id)
  await List.findByIdAndUpdate(containingList._id, { items: containingList.items })
  response.json(savedItem)

  /* Max ich habe das einmal rauskommentiert, weil ich noch nicht
  genau wusste was da warum passiert (warum du das mit callback
  gelöst hast etc., bzw. welche Probleme entstehen, wenn man es
  ummodelt und dann schnell zurück kann.*/
  /*
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
  }) */
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
