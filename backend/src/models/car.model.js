const { Schema, model } = require("mongoose");

const CarSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  transmission: {
    type: String,
  },
  fuel: {
    type: String,
  },
  seats: {
    type: String,
  },
  car_type: {
    type: String,
  },
  ratings: {
    type: String,
  },
  kms: {
    type: String,
  },
  address: {
    type: String,
  },
  discount_price: {
    type: String,
  },
  original_price: {
    type: String,
  },
});

const CarModel = model("car", CarSchema);

module.exports = CarModel;
