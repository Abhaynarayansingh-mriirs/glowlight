'use strict';

var db;
var backup = new Firebase("https://sandstore.firebaseio.com/growDB");

if (localStorage.growDB){
  db = JSON.parse(localStorage.growDB)
} else {
  db = { traits: {}, mates: {}, allMates: [], allTraits: [] }
}


function values(obj){
  var result = [];
  for (var k in obj) result.push(obj[k]);
  return result
}


var GrowLight = {

  setMate(mateId, data){
    if (!db.mates[mateId]){
      db.allMates.unshift(mateId)
      db.mates[mateId] = { id: mateId, wantsToBe: {} }
    }
    for (var k in data){
      db.mates[mateId][k] = data[k]
    }
    this.store()
  },

  addTrait(t){
    if (!db.traits[t]){
      db.traits[t] = { id: t, name: t }
      db.allTraits.push(t)
    }
  },

  setTrait(mateId, wantsToBe, expandsAround){
    this.addTrait(wantsToBe)
    if (expandsAround) this.addTrait(expandsAround);
    var mate = db.mates[mateId];
    if (!mate.wantsToBe[wantsToBe]) mate.wantsToBe[wantsToBe] = {}
    if (expandsAround) mate.wantsToBe[wantsToBe][expandsAround] = true;
    this.store()
  },

  removeTrait(mateId, wantsToBe, expandsAround){
    var mate = db.mates[mateId];
    if (!expandsAround){
      delete mate.wantsToBe[wantsToBe];
    } else {
      delete mate.wantsToBe[wantsToBe][expandsAround];
    }
    this.store()
  },

  traitMoved(traitId, old_index, new_index){
    db.allTraits.splice(new_index, 0, db.allTraits.splice(old_index, 1)[0])
    this.store()
  },

  mateMoved(mateId, old_index, new_index){
    db.allMates.splice(new_index, 0, db.allMates.splice(old_index, 1)[0])
    this.store()
  },


  // getters

  traits(mate){
    if (!mate) return db.allTraits.map((id) => db.traits[id]);
    else return this.mate(mate).wantsToBe || {};
  },

  allMates(){
    return db.allMates.map((id) => db.mates[id])
  },

  mate(mateId){
    return db.mates[mateId]
  },

  trait(traitId){
    return db.traits[traitId]
  },


  // lifecycle

  store(){
    localStorage.growDB = JSON.stringify(db);
    // console.log('stored!')
    if (GrowLight.onChange) GrowLight.onChange()
    backup.set(db)
  },

  clear(){
    db = { traits: {}, mates: {}, allMates: [], allTraits: [] }
    this.store()
  }

}
