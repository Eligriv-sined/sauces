const express = require("express");

const router = express.Router();
const stuffCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

router.post("/",auth, stuffCtrl.newSauce);
router.put("/:id",auth, stuffCtrl.modifySauce);
router.get("/:id",auth, stuffCtrl.getSauce);
router.delete("/:id",auth, stuffCtrl.deleteSauce);
router.get("/",auth, stuffCtrl.getAllSauce);
router.get("/",auth, stuffCtrl.getSauce);

module.exports = router;
