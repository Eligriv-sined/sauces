const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Manufacturer : {type: String, required : true},
  description : {type: String, required : true},
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
   heat : {type: Number, required: true },
});

module.exports = mongoose.model('sauces', thingSchema);