const testingRouter = require('express').Router()
const Item = require('../models/item')
// const List = require('../models/list')

testingRouter.post('/reset', async (request, response) => {
  await Item.deleteMany({ listId: 10 })
//   await List.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter