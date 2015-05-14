'use strict';

var db;

if (false && localStorage.db){
  db = JSON.parse(localStorage.db)
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
      db.mates[mateId] = { id: mateId, traits: {} }
    }
    for (var k in data){
      db.mates[mateId][k] = data[k]
    }
    this.store()
  },

  setTrait(mateId, trait, relation){
    db.mates[mateId].traits[trait] = relation
    if (!db.traits[trait]){
      db.traits[trait] = { id: trait, name: trait }
      db.allTraits.push(trait)
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

  allTraits(){
    return db.allTraits.map((id) => db.traits[id])
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
    localStorage.db = JSON.stringify(db);
    // console.log('stored!')
    if (GrowLight.onChange) GrowLight.onChange()
  }

}
