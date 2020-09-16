/* eslint-disable no-undef */
// https://fullstackopen.com/en/part4/testing_the_backend

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')

const api = supertest(app)

const List = require('../models/list')
const Item = require('../models/item')

beforeEach(async () => {
  await Item.deleteMany({})
  await List.deleteMany({})

  let itemObject = new Item(helper.initialItems[0])
  await itemObject.save()

  itemObject = new Item(helper.initialItems[1])
  await itemObject.save()

  itemObject = new Item(helper.initialItems[2])
  await itemObject.save()

  let listObject = new List({ listId: 0 })
  await listObject.save()
})

describe('item routes testing', () => {

  test('testing amount of items', async () => {
    const response = await api.get('/api/lists/0')
    expect(response.body).toHaveLength(helper.initialItems.length)
  })

  test('a valid item can be added', async () => {
    const newItem = {
      isCompleted: 0,
      _id: '5f55f5ab4236c70017ac62aa',
      listId: '0',
      text: 'Rice Noodles',
      amount: 3,
      date: '2020-09-07T08:56:11.565Z',
      __v: 0,
    }

    await api
      .post('/api/items/new-item')
      .send(newItem)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const itemsAtEnd = await helper.itemsInDb()
    expect(itemsAtEnd).toHaveLength(helper.initialItems.length + 1)

    const texts = itemsAtEnd.map(r => r.text)
    expect(texts).toContain('Rice Noodles')
  })

  test('insert default value of 1 if amount-property is missing ', async () => {
    const newItem = {
      _id: '5f578977ed9d00358bd40297',
      listId: '0',
      text: 'Coffee Beans',
    }

    await api
      .post('/api/items/new-item')
      .send(newItem)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const item = await Item.find({ text: 'Coffee Beans' })

    expect(item[0]['amount']).toEqual(1)

  })

  test('missing text', async () => {

    const newItem = {
      amount: 5,
    }

    await api
      .post('/api/items/new-item')
      .send(newItem)
      .expect(400)
  })

  test('delete item', async () => {

    const id = '5f55f5ab4236c70017ac63ef'

    await api
      .delete('/api/items/'+ id)
      .expect(204)

  })

  test('update isCompleted', async () => {

    const id = '5f55f5ab4236c70017ac63ef'

    let isCompleted = { isCompleted: true }

    await api
      .put('/api/items/' + id)
      .send(isCompleted)
      .expect(isCompleted)
  })
})


describe('list routes testing', () => {

  const listId = 0

  test('get list with listId', async () => {
    await api
      .get('/api/lists/' + listId)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a valid item can be added', async () => {
    const newList = {
      listId: 1,
    }

    await api
      .post('/api/lists/new-list')
      .send(newList)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/lists')
    expect(response.body).toHaveLength(2)
  })


})


afterAll(() => {
  mongoose.connection.close()
})