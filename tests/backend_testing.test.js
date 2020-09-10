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

// test('lists are returned as json', async () => {
//   await api
//     .get('/api/lists')
//     // .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

afterAll(() => {
  mongoose.connection.close()
})