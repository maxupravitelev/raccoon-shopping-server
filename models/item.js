const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


const itemSchema = new mongoose.Schema({

  listId: { type: String, ref:'User', required: false },

  text: { type: String, maxlength: [20, 'description too long'], required: true }, //productName

  amount: { type: Number, min: 0, max: 99999, required: false, default: 1 }, // *productQuantity

  unitType: { type: String, default: 'Unit(s)' },

  productPrice: { type: Number, min:0, default: 0 },

  productCurrency: { type: String, default: 'EUR' },

  productNotes: { type: String, minlength:1, maxlength: 256 },

  /*Link to an product Image */
  productImage: { type: String },

  //eine 13-Stellige Integer - Europäische Artikelnummer
  ean: { type: Number, min: 0, max: 9999999999999, default: 0 },

  date: { type: Date, default: Date.now }, //addDate
  isCompleted: { type: Boolean, default: false },
  itemId: { type: String } //id
})


// listSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Item', itemSchema)
