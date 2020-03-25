const { model, Schema } = require('mongoose')

module.exports = model('item', new Schema({
  bookID: String,
  title: String,
  subtitle: String,
  authors: String,
  description: String,
  selfLink: String,
  thumbnail: String,
  previewLink: String
}))

