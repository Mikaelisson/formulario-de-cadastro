const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");


router.get("/", auth, (req, res) => {
  if (req.user.admin) {
    res.send("Esses dados somente o admin poderá visualizar");
  } else {
    res.status(401).send("Não é administrador: Acesso negado");
  }
});


module.exports = router;
