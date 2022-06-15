const User = require('../models/User')
const userController = require('./userController')

const home = async (req, res) => {

  let user = req.session.login;
  let selectedUser;
  let userName;
  console.log(user)

  try {
    if(user){
      selectedUser = await User.findOne({ email: user });
      userName = selectedUser.name;
    }
    res.render("index", {userName}); 
  } catch (error) {
    res.send(error)
  }
};

module.exports = { home };
