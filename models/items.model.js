const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

const Items = mongoose.model('Items', ItemSchema)

module.exports = Items