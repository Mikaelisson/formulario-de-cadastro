const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {registerValidate, loginValidate} = require ('../controllers/validate');

const userController = {
  register: async function (req, res) {

    const {error} = registerValidate(req.body);
    if(error){return res.status(400).render('register', {error: 'Erro: verifique os dados e tente novamente.'})}

    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) return res.status(400).render('register', {error: 'Erro: verifique os dados e tente novamente.'});

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    try {
      await user.save();
      res.redirect('/');
    } catch (error) {
      res.status(400).render('register', {error: 'Erro: verifique os dados e tente novamente.'});
    }
  },
  login: async function (req, res) {

    const {error} = loginValidate(req.body);
    if(error){return res.status(400).render('login', {error: "Email ou senha invalidos"})}

    const selectedUser = await User.findOne({ email: req.body.email });
    if (!selectedUser) return res.status(400).render('login', {error: "Email ou senha invalidos"});

    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      selectedUser.password
    );
    if (!passwordAndUserMatch)
      return res.status(400).render('login', {error: "Email ou senha invalidos"});
      
      const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.SECRET_TOKEN)
      
    req.session.login = selectedUser.email;

    res.header('autorization-token', token)
    res.redirect('/');
  },
};

module.exports = userController;
