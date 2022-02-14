require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Weapon = require('./models/weapon.js');
const Shield = require('./models/shield.js');
const Spell = require('./models/spell.js');
const app = express();
const cleanInput = require('./functions/inputClean.js');

const instructions = {
  weapon: '/weapons > for DS2 Weapons',
  shield: '/shields > for DS2 Shields',
  spell: '/spells > for DS2 Spells',
  alt: 'specify type using /weapons/type/weaponType -or- name using /weapons/name/weaponName',
  example: '/weapons/type/Dagger for all dagger class weapons -or- weapons/name/Dagger for the weapon named Dagger. Queries by name will only return one object',
  categories: {
    weapons: 'Dagger, Straight Sword, Greatsword, Ultra Greatsword, Curved Sword, Katana, Curved Greatsword, Piercing Sword, Axe, Great Axe, Hammer, Great Hammer, Fist Weapon, Spear, Halberd, Lance, Reaper, Twinblade, Whip, Bow, Greatbow, Crossbow, Flame, Chime, Staff',
    spells: 'Sorcery, Pyromancy, Miracle, Hex',
    shields: 'Small Shield, Standard Shield, Greatshield, DLC Shield'
  }
}

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({extended:true}));

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.DB_URL);
}

/* ---------------------- Root Query ---------------------- */

app.get('/', (req, res) => {
  res.send(instructions)
});

/* ---------------------- Weapon Queries ---------------------- */

app.get('/weapons', (req,res) => {
  Weapon.find((err, foundWeapons) => {
    if (!err) {
      res.send(foundWeapons);
    }
  })
})

app.get('/weapons/type/:weaponType', (req,res) => {
  const query = decodeURIComponent(req.params.weaponType);
  const param = cleanInput(query);

  Weapon.find({type: param}, (err, foundWeapons) => {
    if (!err) {
      res.send(foundWeapons);
    } else {
      console.log(err);
    }
  });
});

app.get('/weapons/name/:weaponName', (req,res) => {
  const query = decodeURIComponent(req.params.weaponName);
  const param = cleanInput(query);

  Weapon.findOne({title: param}, (err, foundWeapon) => {
    if (!err) {
      res.send(foundWeapon);
    } else {
      console.log(err);
    }
  });
})

/* ---------------------- Shield Queries ---------------------- */

app.get('/shields', (req,res) => {
  Shield.find((err, foundShields) => {
    if (!err) {
      res.send(foundShields);
    }
  })
})

app.get('/shields/type/:shieldType', (req,res) => {
  const query = decodeURIComponent(req.params.shieldType);
  const param = cleanInput(query);

  Shield.find({type: param}, (err, foundShields) => {
    if (!err) {
      res.send(foundShields);
    } else {
      console.log(err);
    }
  });
});

app.get('/shields/name/:shieldName', (req,res) => {
  const query = decodeURIComponent(req.params.shieldName);
  const param = cleanInput(query);

  Shield.findOne({title: param}, (err, foundShield) => {
    if (!err) {
      res.send(foundShield);
    } else {
      console.log(err);
    }
  });
})

/* ---------------------- Spell Queries ---------------------- */

app.get('/spells', (req,res) => {
  Spell.find((err, foundSpells) => {
    if (!err) {
      res.send(foundSpells);
    }
  })
})

app.get('/spells/type/:spellType', (req,res) => {
  const query = decodeURIComponent(req.params.spellType);
  const param = cleanInput(query);

  Spell.find({type: param}, (err, foundSpells) => {
    if (!err) {
      res.send(foundSpells);
    } else {
      console.log(err);
    }
  });
});

app.get('/spells/name/:spellName', (req,res) => {
  const query = decodeURIComponent(req.params.spellName);
  const param = cleanInput(query);

  Spell.findOne({title: param}, (err, foundSpell) => {
    if (!err) {
      res.send(foundSpell);
    } else {
      console.log(err);
    }
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
