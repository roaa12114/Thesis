const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    liked: {
      type: ["String"],
      required: false,
    },
    wallet: {
      type: Number,
      required:true,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model(
  "User", UserSchema, "users"
);

module.exports = UserModel;
