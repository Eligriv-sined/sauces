const express = require("express");

const router = express.Router();
const stuffCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

router.post("/",auth, stuffCtrl.createThing);
router.put("/:id",auth, stuffCtrl.modifyThing);
router.get("/:id",auth, stuffCtrl.getThing);
router.delete("/:id",auth, stuffCtrl.deleteThing);
router.get("/",auth, stuffCtrl.getAllThing);

module.exports = router;
