'use strict';
React.initializeTouchEvents(true)



// todo: (1h)

// * remove/rename mate using card [10m]
// * github pages home [10m]

// * remove traits using card [20m]
// * fix any remaining click and reorder bugs [20m]





var App = React.createClass({

  getInitialState() {
      GrowLight.onChange = () => {
        this.setState({
          mates: GrowLight.allMates(),
          traits: GrowLight.allTraits()
        })
      }
      return {
        display: 'mates',
        mates: GrowLight.allMates(),
        traits: GrowLight.allTraits()
      }
  },

  addThing() {
    var name = prompt('Name:')
    GrowLight.setMate(name, {name: name})
    this.setState({mates: GrowLight.allMates()})
  },

  cardHidden(){
    console.log('cardHidden is run')
    this.setState({selectedMate: null})
  },

  mateClicked(targetId){
    console.log('mateClicked is run', targetId)
    this.setState({selectedMate: targetId})
  },

  mateMoved(oldIndex, newIndex){
    GrowLight.mateMoved('.', oldIndex, newIndex)
  },

  traitMoved(oldIndex, newIndex){
    GrowLight.traitMoved('.', oldIndex, newIndex)
  },

  toggleDisplay(){
    this.setState({
      display: {
        mates: 'traits',
        traits: 'mates'
      }[this.state.display]
    })
  },

  renderContent(){
    if (this.state.display == 'mates'){
      return <SortableList onObjMoved={this.mateMoved} items={this.state.mates} onClicked={this.mateClicked} />
    } else {
      return <SortableList  onObjMoved={this.traitMoved} items={this.state.traits} />;
    }
  },

  render() {
    return <body>
      <header className="bar bar-nav">
        <button className="btn pull-right" onClick={this.addThing}>Add</button>
        <button className="btn pull-left" onClick={this.toggleDisplay}>...</button>
        <h1 className="title">{this.state.display}</h1>
      </header>
      <div className="content">{ this.renderContent() }</div>
      <MateCard mate={this.state.selectedMate} onHidden={this.cardHidden}/>
    </body>
  }
})

React.render(
  <App />,
  document.body
);
