const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


// const url = process.env.MONGODB_URI;

// console.log('connecting to', url)

// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then((result) => {
//     console.log("connected to", url);
//   })
//   .catch((error) => {
//     console.log("error connecting to MongoDB:", error.message);
//   });


// const listSchema = new mongoose.Schema({
//       newItems: [{
//           text: String,
//           amount: Number,
//           price: Number,
//           isCompleted: Number
//         }]
//     });

const itemSchema = new mongoose.Schema({

  listId: { type: String, ref:'User', required: false },
  text: { type: String, maxlength: [20, 'description too long'], required: true },
  // amount: {type: Number, min: 1, required: false},
  amount: { type: Number, required: false, default: 1 },

  date: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  itemId: { type: String }
})

// listSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Item', itemSchema)
