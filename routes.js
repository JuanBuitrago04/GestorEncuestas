const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/encuestas", controllers.getEncuestas);
router.post("/responder", controllers.responderEncuesta);

module.exports = router;