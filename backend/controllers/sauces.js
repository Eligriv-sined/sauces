
const Sauces = require('../models/sauces');


exports.createThing = (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
      ...req.body,
    });
    sauces
      .save()
      .then(() => res.status(201).json({ message: "Obj save" }))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.modifyThing = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then((sauces) => res.status(200).json({ message: "obj modifier" }))
      .catch((error) => res.status(404).json({ error }));
  }
  exports.deleteThing = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id }).then(
      (sauces) => {
        if (!sauces) {
          res.status(404).json({
            error: new Error('No such sauces!')
          });
        }
        if (sauces.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        }
        sauces.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    )
  };


  exports.getThing = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(404).json({ error }));
  }

  exports.getAllThing = (req, res, next) => {
    Sauces.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.statut(400).json({ error }));
  }