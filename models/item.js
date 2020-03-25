const { model, Schema } = require('mongoose')

module.exports = model('item', new Schema({
  GoogleBookId: String,
  selfLink: String,
  title: String,
  subtitle:String,
  author: String,
  imageLinks:String,
  description:String
}))