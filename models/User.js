const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //space를 없애주는 기능
    unique: 1, //does not allow same email
  },
  password: {
    type: String,
    maxlength: 5,
  },
  role: {
    type: Number, //1이면 관리자, 0이면 client
    default: 0, //role을 정하지 않으면 default role
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    //token's expiration time
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User }; //other files can access
