const express = require('express');
const bcrypt = require('bcryptjs');
let router = express.Router();
var User = require('../../models/user');

router.get('/', async (req, res) => {
  let user = await User.find();
  return res.send(user);
});

router.get('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('User not found');
    return res.send(user);
  } catch (err) {
    return res.status(400).send('Invalid User ID');
  }
});

router.put('/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  return res.send(user);
});

router.delete('/:id', async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});

router.post('/', async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return res.send(user);
});

// router.post("/login", async (req, res) => {
//     console.log(req.body);
//     try {
//         const user = await User.findOne({ email: req.body["login-email"] });
//         console.log(user);
//         if (!user) {
//             req.session.flash = { type: "danger", message: "No User Found" };
//             return res.redirect("/register");
//         }
//         const validPassword = await bcrypt.compare(req.body["login-password"], user.password);
//         if (!validPassword) {
//             req.session.flash = { type: "danger", message: "Incorrect Password" };
//             return res.redirect("/login");
//         }
//         req.session.user = user;
//         req.session.flash = { type: "success", message: "Logged In Successfully" };
//         return res.redirect("/");
//     } catch (error) {
//         console.error("Error during login:", error);
//         req.session.flash = { type: "danger", message: "Internal Server Error" };
//         return res.redirect("/login");
//     }
// });

router.post('/register', async (req, res) => {
  try {
    let user = new User({
      username: req.body['signup-username'],
      email: req.body['signup-email'],
      password: req.body['signup-password'],
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    req.session.user = user;
    req.session.flash = { type: 'success', message: 'Registered Successfully' };
    return res.redirect('/homepage');
  } catch (error) {
    console.error('Error saving user:', error);
    req.session.flash = { type: 'danger', message: 'User already exists' };
    return res.redirect('/register');
  }
});

module.exports = router;

//session based authentication, hashing using bcrypt (A_3)
//project authcheck
