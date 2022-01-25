const Sauces = require("../models/sauces");
const fs = require("fs");

exports.newSauce = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then((sauces) => res.status(200).json({ message: "obj modifier" }))
    .catch((error) => res.status(404).json({ error }));
};
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.findOne({ _id: req.params.id }).then((sauces) => {
          if (!sauces) {
            res.status(404).json({
              error: new Error("No such sauces!"),
            });
          }
          if (sauces.userId !== req.auth.userId) {
            res.status(403).json({
              error: new Error("Unauthorized request!"),
            });
          }
          sauces
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({
                message: "Deleted!",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.statut(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  let like = req.body.like;
  let idUsers = req.body.userId;
  let saucesId = req.params.id;

  if (like === 1) {
    Sauces.findOne({ _id: saucesId })
      .then((Sauces) => {
        if (!Sauces.usersLiked.includes(idUsers)) {
          Sauces.updateOne(
            { _id: saucesId },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: idUsers },
            }
          )
            .then(() =>
              res.status(201).json({ message: "Vous avez liké cette sauce!" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }

 else if (like === -1) {
    Sauces.findOne({ _id: saucesId })
      .then((Sauces) => {
        if (!Sauces.usersDisliked.includes(idUsers)) {
          Sauces.updateOne(
            { _id: saucesId },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: idUsers },
            }
          )
            .then(() =>
              res
                .status(201)
                .json({ message: "Vous aves dislike cette sauce!" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }

  if (like === 0) {
    Sauces.findOne({ _id: saucesId })
      .then((Sauces) => {
        if (Sauces.usersLiked.includes(idUsers)) {
          Sauces.updateOne(
            { _id: saucesId },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: idUsers },
            }
          )
            .then(() =>
              res.status(201).json({ message: "Votre Like a etait retirer " })
            )
            .catch((error) => res.status(400).json({ error }));
        }

        if (Sauces.usersDisliked.includes(idUsers)) {
          Sauces.updateOne(
            { _id: saucesId },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: idUsers },
            }
          )
            .then(() =>
              res
                .status(201)
                .json({ message: "Votre dislike a etait retirer" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
