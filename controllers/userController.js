const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {registerValidate, loginValidate} = require ('../controllers/validate');

const userController = {
  register: async function (req, res) {

    const {error} = registerValidate(req.body);
    if(error){return res.status(400).send(error.message)}

    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) return res.status(400).send("Email ou senha invalidos");

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    try {
      const savedUser = await user.save();
      res.send(`Usuário ${savedUser.name} cadastrado com sucesso.`);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async function (req, res) {

    const {error} = loginValidate(req.body);
    if(error){return res.status(400).send(error.message)}

    const selectedUser = await User.findOne({ email: req.body.email });
    if (!selectedUser) return res.status(400).send("Email ou senha invalidos");

    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      selectedUser.password
    );
    if (!passwordAndUserMatch)
      return res.status(400).send("Email ou senha invalidos");
      
      const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.SECRET_TOKEN)
      
    req.session.login = selectedUser.email;

    res.header('autorization-token', token)
    res.redirect('/');
  },
  logged: function (req, res) {
    res.send("Esses dados será visivel somente quem estiver logado");
  }
};

module.exports = userController;
