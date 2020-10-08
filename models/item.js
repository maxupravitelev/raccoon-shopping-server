const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const itemSchema = new mongoose.Schema({

  listId: { type: String, ref:'list', required: true }, //NEUERUNG!!! Ich habe das mal auf required gesetzt, damit keine herumirrenden Items in der Datenbank liegen

  mongoListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },

  text: { type: String, maxlength: [20, 'description too long'], required: true }, //productName

  amount: { type: Number, min: 0, max:99999, default: 1 }, // *productQuantity

  /*Hier wäre eine Liste von akzeptierten Units gut, die man dann (z.B.) via dropdownmenü anwählen kann (etc. etc.)*/
  unitType: { type: String, default: 'Unit(s)' },

  /*
    - Defaultet erstmal auf 0. Mit default-Wert kannst du die Umsetzung in der Web-App ja dann beliebig planen
    - Max Value? könnte sinnvoll sein...
    */
  productPrice: { type: Number, min:0, default: 0 },

  productCurrency: { type: String, default: 'EUR' },

  productTextNote: { type: String, minlength:1, maxlength: 256 },

  /*Man könnte hier anstatt der Links auch IDs der Datenbankeinträge
    zu den Bildern/Sounddateien senden, aber wenn wir das mit populate()
    benutzen wollen, könnte das problematisch sein... */

  /*Link to a Voice Note*/
  productVoiceNote: { type: String },
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
