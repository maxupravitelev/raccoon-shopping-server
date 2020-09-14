const List = require("../models/list");
const Item = require("../models/item");

const initialItems = [
  {
    isCompleted: false,
    _id: "5f55f5ab4236c70017ac63ef",
    listId: "0",
    text: "Cookies",
    amount: 3,
    date: "2020-09-07T08:56:11.565Z",
    __v: 0,
  },
  {
    isCompleted: false,
    _id: "5f55f5af4236c70017ac63f0",
    listId: "0",
    text: "Panzer",
    amount: 1,
    date: "2020-09-07T08:56:15.510Z",
    __v: 0,
  },
  {
    isCompleted: true,
    _id: "5f578977ed9d35358bd40297",
    listId: "0",
    text: "Cookies",
    amount: 3,
    date: "2020-09-08T13:39:03.675Z",
    __v: 0,
  },
];



// not fully working yet, need to include List for different Lists
const itemsInDb = async () => {
    const items = await Item.find({})
    return items.map(item => item.toJSON())
  }
  
  module.exports = {
    initialItems, itemsInDb
  }