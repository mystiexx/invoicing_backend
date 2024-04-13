const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  total: Number,
});

const invoiceSchema = mongoose.Schema(
  {
    invoice_to: {
      type: String,
      require: true,
    },
    phone_number: {
      type: String,
      require: true,
    },
    invoice_no: {
      type: String,
    },
    invoice_date: {
      type: String,
      require: true,
    },
    due_date: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "open",
    },
    address: {
      type: String,
      require: true,
    },
    total_amount: {
      type: Number,
      require: true,
    },
    items: [subSchema],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
