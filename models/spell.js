const mongodb = require('mongodb');
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  type: String,
  level: String
}, {_id: false});

const spellSchema = new mongoose.Schema({
  type: String,
  title: String,
  link: String,
  uses: String,
  spellSlots: String,
  statReq: statSchema,
  flavorText: String,
  foundAt: String,
  soulCost: String
});

const Spell = mongoose.model('Spell', spellSchema);
module.exports = Spell;
