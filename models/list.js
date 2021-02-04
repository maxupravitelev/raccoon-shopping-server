const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const listSchema = new mongoose.Schema({
  listId: { type: Number },
  listName: { type: String, default: 'New Shopping List' },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],

  // not implemented yet:
  listNotes: { type: String, minlength: 1, maxlength: 256 },

  listDeadline: { type: Date, min: Date.now, default: new Date(2099, 12, 31) },

  usage: [Date], //array of dates, arrays default to an empty array in mongoose.

  //lastUsed: { type: Date, max: Date.now, default: new Date(1900, 1, 1) },

  listReuse: { type: Number, min: 0, default: 0 },

  listType: { type: String, default: 'regular List' },

  preferedShop: { type: String, default: 'Umme Ecke' },
})

module.exports = mongoose.model('List', listSchema)
