const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/register', (req, res)=>{
    res.render('register')
});
router.get('/login', (req, res)=>{
    req.session.login = null;
    res.render('login')
});
router.get("/logged", userController.logged);


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router