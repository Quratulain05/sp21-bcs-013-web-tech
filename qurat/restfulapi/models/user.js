let mongoose = require('mongoose');

let modelSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false, required: true },
    role: String,
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model('User', modelSchema);
module.exports = User;
