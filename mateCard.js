'use strict';

var MateCard = React.createClass({

  add(){
    var traits = GrowLight.mate(this.props.mate).wantsToBe || {}
    this.props.navigator.push({
      class: SelectList,
      props: {
        title: "What does " + this.props.mate + " want to be?",
        navigator: this.props.navigator,
        options: GrowLight.traits(),
        selected: traits,
        onDone: (added,removed) => {
          added.forEach( (k) => GrowLight.setTrait(this.props.mate, k) )
          removed.forEach( (k) => GrowLight.removeTrait(this.props.mate, k) )
        }
      }
    })
  },

  addExpandsAroundTrait(evt){
    var key = evt.currentTarget.getAttribute('itemID')
    var traits = GrowLight.traits(this.props.mate)

    this.props.navigator.push({
      class: SelectList,
      props: {
        title: "What would help " + this.props.mate + " be " + key + "?",
        navigator: this.props.navigator,
        options: GrowLight.traits(),
        selected: traits[key],
        onDone: (added,removed) => {
          added.forEach( (k) => GrowLight.setTrait(this.props.mate, key, k) )
          removed.forEach( (k) => GrowLight.removeTrait(this.props.mate, key, k) )
        }
      }
    })
  },

  done(){
    this.props.navigator.pop()
  },

  render(){
    if (!this.props.mate) return null;
    var traits = GrowLight.mate(this.props.mate).wantsToBe || {}
    console.log(traits);

    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-right" onClick={this.add}>Add</button>
          <button className="btn pull-left" onClick={this.done}>Done</button>
          <h1>{this.props.mate}</h1>
        </header>
        <ul className="table-view content">{
            Object.keys(traits).map((t) => {
              return (
                <li
                  itemID={t}
                  onClick={this.addExpandsAroundTrait} className="table-view-cell clickable"
                >
                  <b>{t}</b>
                  {Object.keys(traits[t]||{}).join(', ')}
                </li>
              )
            })
        }</ul>

        <button className="btn btn-block" onClick={this.addWantsToBeTrait}> wants to be...</button>
      </div>
    )
  }

})
