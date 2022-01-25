const express = require("express");

const router = express.Router();
const stuffCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, stuffCtrl.getAllSauce);
router.post("/", auth, multer, stuffCtrl.newSauce);
router.get("/:id", auth, stuffCtrl.getSauce);
router.put("/:id", auth, multer, stuffCtrl.modifySauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);
router.post("/:id/like", auth, multer, stuffCtrl.likeSauce);

module.exports = router;
