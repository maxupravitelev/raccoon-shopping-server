//const mongo = require('mongodb');

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


// const url = process.env.MONGODB_URI

// console.log('connecting to', url)

// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => {
//     console.log('connected to', url)
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

const listSchema = new mongoose.Schema({
  listId: { type: Number },
  
  listName: { type: String, default: "New Shopping List" },
  
  listNotes: { type: String, minlength:1, maxlength: 256 },
  
  listDeadline: { type: Date, min: Date.now, default: new Date(2099, 12, 31) },

  usage: [Date], //array of dates, arrays default to an empty array in mongoose.

  //gedacht z.B. zur Filterung von Listen nach Beliebtheit  --> braucht man aber wenn es usage gibt nicht.
  //lastUsed: { type: Date, max: Date.now, default: new Date(1900, 1, 1) },

  //wie oft wird die Liste verwendet: alle ... Tage; 0 -> keine Wiederverwendung
  listReuse: { type: Number, min:0, default: 0},

  /*gedacht z.B. zur Filterung von Listen entsprechend von 
  standardisierten Bedürfnislagen -- vielleicht wäre hier 
  langfristig auch eine Tag funktion besser */
  listType: { type: String, default: "regular List" },

  preferedShop: {type: String, default: "Umme Ecke" }
  })


module.exports = mongoose.model('List', listSchema)
