const User = require("../models/User");

const home = async (req, res) => {
  let user = req.session.login;
  let selectedUser;
  let userName;

  try {
    if (user) {
      selectedUser = await User.findOne({ email: user });
      userName = selectedUser.name;
    }
    res.render("index", { userName });
  } catch (error) {
    res.render('404', {error});
  }
};

const desconect = (req, res) => {
  req.session.login = null
  res.redirect("/");
};

module.exports = { home, desconect };
