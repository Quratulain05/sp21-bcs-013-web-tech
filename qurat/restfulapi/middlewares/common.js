let User = require('../models/user');
module.exports = async function (req, res, next) {
  //comment below line in production
  //below line will always keep a user logged in even if server restarts
  // req.session.user = await User.findOne({ email: "admin@admin.com" });

  res.locals.user = req.session.user;
  res.locals.flash = req.session.flash;
  req.session.flash = null;
  next();
};
