const mongodb = require('mongodb');
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  strength: {},
  dexterity: {},
  intelligence: {},
  faith: {}
}, {_id: false});
const scalingSchema = new mongoose.Schema({
  strength: String,
  dexterity: String,
  intelligence: String,
  faith: String
}, {_id: false});

const shieldSchema = new mongoose.Schema({
  type: String,
  title: String,
  link: String,
  statReq: statSchema,
  statScal: scalingSchema,
  flavorText: String
});

const Shield = mongoose.model('Shield', shieldSchema);
module.exports = Shield;
