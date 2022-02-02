const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
require("dotenv").config()

mongoose
  .connect(
    process.env.moongo+"?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use("/images", express.static(path.join(__dirname, "images"))); //multer

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //accéder à notre API depuis n'importe quelle origine 
  res.setHeader( //ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(//envoyer des requêtes avec les méthodes mentionnées
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
