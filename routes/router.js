const express = require("express");
const router = express.Router();

const homeConfig = require('../controllers/homeConfig');

router.get('/', homeConfig.home);


module.exports = router;