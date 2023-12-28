const express = require('express');
const bcrypt = require('bcryptjs');
let router = express.Router();
let User = require('../../models/user');
router.get('/login', (req, res) => {
  res.render('auth/login');
});
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
});
router.post('/login', async (req, res) => {
  // console.log(req.body);
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body['login-email'] });
    console.log(user);
    if (!user) {
      req.session.flash = { type: 'danger', message: 'No User Found' };
      return res.redirect('/register');
    }
    const validPassword = await bcrypt.compare(
      req.body['login-password'],
      user.password
    );
    if (!validPassword) {
      req.session.flash = { type: 'danger', message: 'Incorrect Password' };
      return res.redirect('/login');
    }
    req.session.user = user;
    req.session.flash = { type: 'success', message: 'Logged In Successfully' };
    return res.redirect('/homepage');
  } catch (error) {
    console.error('Error during login:', error);
    req.session.flash = { type: 'danger', message: 'Internal Server Error' };
    return res.redirect('/login');
  }
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});
// router.post("/", async (req, res) => {
//   try {
//     let user = new User({
//       username: req.body["signup-username"],
//       email: req.body["signup-email"],
//       password: req.body["signup-password"],
//     });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     await user.save();
//     req.session.user = user;
//     return res.redirect("/");
//   } catch (error) {
//     console.error("Error saving user:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
