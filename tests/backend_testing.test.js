// https://fullstackopen.com/en/part4/testing_the_backend

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')

const api = supertest(app)

const List = require("../models/list");
const Item = require("../models/item");

beforeEach(async () => {
  await Item.deleteMany({})

  let itemObject = new Item(helper.initialItems[0])
  await itemObject.save()

  itemObject = new Item(helper.initialItems[1])
  await itemObject.save()

  itemObject = new Item(helper.initialItems[2])
  await itemObject.save()
})

test('testing amount of items', async () => {
  const response = await api.get('/api/lists/0')
  expect(response.body).toHaveLength(helper.initialItems.length)
})

test('a valid item can be added', async () => {
  const newItem = {
    isCompleted: 0,
    _id: "5f55f5ab4236c70017ac62aa",
    listId: "0",
    text: "Rice Noodles",
    amount: 3,
    date: "2020-09-07T08:56:11.565Z",
    __v: 0,
  }

  await api
    .post('/api/items/new-item')
    .send(newItem)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const itemsAtEnd = await helper.itemsInDb()
  expect(itemsAtEnd).toHaveLength(helper.initialItems.length + 1)
  
  // const titles = blogsAtEnd.map(r => r.title)
  // expect(titles).toContain('Canonical string reduction')
})

// test('lists are returned as json', async () => {
//   await api
//     .get('/api/lists')
//     // .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

afterAll(() => {
  mongoose.connection.close()
})