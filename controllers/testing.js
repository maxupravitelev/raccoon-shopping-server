const testingRouter = require('express').Router()
const Item = require('../models/note')
// const List = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
//   await Item.deleteMany({})
//   await List.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter