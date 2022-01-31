const multer = require("multer");// Création de configuration pour multer - diskStorage => veut dire qu'on enregistre sur le disque

const MIME_TYPES = {// Dictionnaire MIME_TYPES qui sera un objet
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({// Création de configuration pour multer - diskStorage => veut dire qu'on enregistre sur le disque
  destination: (req, file, callback) => {
    callback(null, "images");   // null pour dire qu'il n'ya pas eu d'erreur et images pour la destination
  },
  filename: (req, file, callback) => {// filename expliquera à multer quel nom de fichier il faut utiliser
        // Génerer le nom, s'il ya espace dans le nom de fichier ça peut créer des problèmes au niveau serveur donc on split
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
