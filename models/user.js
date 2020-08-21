const mongo = require('mongodb');

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to', url)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const userSchema = new mongoose.Schema({
    username: { type: String},
    userCount: { type: Number }
    })


module.exports = mongoose.model('User', userSchema)
