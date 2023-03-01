const { Schema, model } = require("mongoose");

const UserSchema = new Schema( 
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);
module.exports = UserModel;
