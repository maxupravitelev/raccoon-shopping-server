const listRouter = require('express').Router()
const List = require('../models/list')
const Item = require('../models/item')
const { response } = require('../app')


///***** .get routes */

/* .get all lists */
listRouter.get('/', async (request, response) => {
  const list = await List.find({})
  response.json(list)
})


/* .get all Items in List via listId */
listRouter.get('/:id', async (request, response) => {
  const list = await Item.find({ listId: request.params.id })
  response.json(list)

})

///***** .post routes */

/* .post new list; create new list*/
listRouter.post('/new-list', (request, response) => {

  let listCount = 0

  List.countDocuments({}, async (error, count) => {
    listCount = count
    // console.log(listCount)

    let list = new List ({
      listId: listCount++
    })
    // console.log(list)

    const newList = await list.save()
    response.json(newList)

  })
})


module.exports = listRouter