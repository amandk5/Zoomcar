const { Schema, model } = require("mongoose");
 
const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  cars: [{ type: Schema.Types.ObjectId, ref: "car" }],
});

const BookingModel = model("booking", BookingSchema);

module.exports = BookingModel;
