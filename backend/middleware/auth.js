const jwt = require("jsonwebtoken"); // Impoter le module json web token

module.exports = (req, res, next) => {// Fonction autorisation
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Random_token_secret");
    const userId = decodedToken.userId;
    req.auth = { userId }; // Création d'un objet auth
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "requete non authentifier" });
  }
};
