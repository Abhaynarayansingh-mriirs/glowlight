'use strict';


var db = {

  items: {},
  firebase: new Firebase("https://sandstore.firebaseio.com/fateItems"),

  values(){
    var result = [];
    for (var k in db.items) result.push(db.items[k]);
    return result
  },

  store(item){
    if (item){
      if (!item.id) item.id = Date.now()
      if (!item.myArchtypes) item.myArchtypes = {}
      if (!item.mateArchtypes) item.mateArchtypes = {}
      if (!item.timeframe) item.timeframe = 'Now'
      db.items[item.id] = item
    }
    if (db.onChange) db.onChange()
    setTimeout(()=>{
      localStorage.items = JSON.stringify(db.items);
      db.firebase.set(db.items)
    }, 0)
    return item && item.id
  },

  rm(itemID){
    delete db.items[itemID];
    this.store()
  },

  byTimeframe(mate){
    var x = this.values();
    if (mate) x = x.filter( e => e.mate == mate )
    return x.reduce( (acc, e) => {
      if (!acc[e.timeframe]) acc[e.timeframe] = []
      acc[e.timeframe].push(e)
      return acc;
    }, {});
  },

  archtypes(){
    var x = {}
    this.values().forEach( e => {
      for (var k in e.myArchtypes||{})   x[k] = e.myArchtypes[k]
      for (var k in e.mateArchtypes||{}) x[k] = e.mateArchtypes[k]
    })
    return Object.keys(x).sort()
  },

  mates(){
    var x = {}
    for (var k in db.items) x[db.items[k].mate] = true
    return Object.keys(x).sort()
  },

  timeframes(){
    return ['Now', 'Today', 'Next Week', 'Next Year']
  }

}

if (localStorage.items) db.items = JSON.parse(localStorage.items)



//
// var GrowLight = {
//
//   setMate(mateId, data){
//     if (!db.mates[mateId]){
//       db.allMates.unshift(mateId)
//       db.mates[mateId] = { id: mateId, wantsToBe: {} }
//     }
//     for (var k in data){
//       db.mates[mateId][k] = data[k]
//     }
//     this.store()
//   },
//
//   addTrait(t){
//     if (!db.traits[t]){
//       db.traits[t] = { id: t, name: t }
//       db.allTraits.push(t)
//     }
//   },
//
//   setTrait(mateId, wantsToBe, expandsAround){
//     this.addTrait(wantsToBe)
//     if (expandsAround) this.addTrait(expandsAround);
//     var mate = db.mates[mateId];
//     if (!mate.wantsToBe[wantsToBe]) mate.wantsToBe[wantsToBe] = {}
//     if (expandsAround) mate.wantsToBe[wantsToBe][expandsAround] = true;
//     this.store()
//   },
//
//   removeTrait(mateId, wantsToBe, expandsAround){
//     var mate = db.mates[mateId];
//     if (!expandsAround){
//       delete mate.wantsToBe[wantsToBe];
//     } else {
//       delete mate.wantsToBe[wantsToBe][expandsAround];
//     }
//     this.store()
//   },
//
//   traitMoved(traitId, old_index, new_index){
//     db.allTraits.splice(new_index, 0, db.allTraits.splice(old_index, 1)[0])
//     this.store()
//   },
//
//   mateMoved(mateId, old_index, new_index){
//     db.allMates.splice(new_index, 0, db.allMates.splice(old_index, 1)[0])
//     this.store()
//   },
//
//
//   // getters
//
//   traits(mate){
//     if (!mate) return db.allTraits.map((id) => db.traits[id]);
//     else return this.mate(mate).wantsToBe || {};
//   },
//
//   allMates(){
//     return db.allMates.map((id) => db.mates[id])
//   },
//
//   mate(mateId){
//     return db.mates[mateId]
//   },
//
//   trait(traitId){
//     return db.traits[traitId]
//   },
//
//
//   // lifecycle
//
//   store(){
//     localStorage.growDB = JSON.stringify(db);
//     // console.log('stored!')
//     if (GrowLight.onChange) GrowLight.onChange()
//     backup.set(db)
//   },
//
//   clear(){
//     db = { traits: {}, mates: {}, allMates: [], allTraits: [] }
//     this.store()
//   }
//
// }
