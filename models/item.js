const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => {
    console.log("connected to", url);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });


// const listSchema = new mongoose.Schema({
//       newItems: [{
//           text: String,
//           amount: Number,
//           price: Number,
//           isCompleted: Number 
//         }]
//     });

const itemSchema = new mongoose.Schema({
  
    listId: {type: String, ref:'User', required: false},
    text: {type: String, maxlength: [20, 'description too long'], required: false},
    amount: {type: Number, min: 1, required: false},
    date: {type: Date, default: Date.now},
    isCompleted: {type: Number, default: 0}
  });

// listSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Item', itemSchema)
