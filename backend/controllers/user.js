const bcrypt = require("bcrypt"); //package crypatge
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {

  bcrypt //apelle de la fonction cryptage mdp , bcrypy.hash , le 10 , represente le nombre de tours de cryptage , plus la valauer est elevé plus cela et sur mais plus ça prend de temps
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created" }))
        .catch((error) =>
          res.status(400).json({ message: "Email deja utilisé" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // connexion utilisateurs
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "no user" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log(valid);
          if (!valid) {
            return res.status(401).json({ error: "wrong password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "Random_token_secret", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
