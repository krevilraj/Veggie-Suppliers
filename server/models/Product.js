const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  short_description: {
    type: String
  },
  description: {
    type: String
  },
  sku: {
    type: String,
    maxlength: 50
  },
  regular_price: {
    type: Number,
    default: 0
  },
  sales_price: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  },
  manage_stock: {
    type: Boolean,
    default: false
  },
  stock_quantity: {
    type: Number,
    default: false
  },
  stock_availabilty: {
    type: String,
    maxlength: 20
  },
  specification: {
    type: Array,
    default: []
  },
  disable_price: {
    type: Boolean,
    default: false
  },
  enable_featured: {
    type: Boolean,
    default: false
  },
  continents: {
    type: Number,
    default: 1
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  current_status: {
    type: String,
    default: true
  },
}, {timestamps: true})


productSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = {Product}