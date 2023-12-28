module.exports = function (req, res, next) {
  console.log(req.session.user);
  if (req.session.user.role != 'admin') {
    req.session.flash = {
      type: 'danger',
      message: 'Only Admin Can View This Area',
    };
    return res.redirect('/login');
  }

  next();
};
