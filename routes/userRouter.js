const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/register', (req, res)=>{
    const error = null;
    res.render('register', {error});
});
router.get('/login', (req, res)=>{
    req.session.login = null;
    const error = null;
    res.render('login', {error})
});


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router