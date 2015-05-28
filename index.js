'use strict';
React.initializeTouchEvents(true)

// TO DO:

// * matepage button pushes wantsToBe page to select wantsToBe traits
// * wantsToBe also
// * multiselect list widget

// * rename mate using card [5m]
// * port navigationpush stuff from hindsight widgetry



var App = React.createClass({

  getInitialState() {
      GrowLight.onChange = () => {
        this.setState({
          mates: GrowLight.allMates(),
          traits: GrowLight.traits()
        })
      }
      return {
        stack: [],
        display: 'mates',
        mates: GrowLight.allMates(),
        traits: GrowLight.traits()
      }
  },

  addThing() {
    if (this.state.display != 'mates') return;
    var name = prompt('Name:')
    if (!name) return;
    GrowLight.setMate(name, {name: name})
    this.setState({mates: GrowLight.allMates()})
  },

  mateClicked(targetId){
    this.push({
      class: MateCard,
      props: {
        mate: targetId,
        navigator: this
      }
    })
  },

  mateMoved(oldIndex, newIndex){
    GrowLight.mateMoved('.', oldIndex, newIndex)
  },

  traitMoved(oldIndex, newIndex){
    GrowLight.traitMoved('.', oldIndex, newIndex)
  },

  toggleDisplay(){
    this.setState({
      display: { mates: 'traits', traits: 'mates' }[this.state.display]
    })
  },

  push(obj){
    this.setState({stack: this.state.stack.concat([obj])});
  },

  pop(){
    this.setState({stack: this.state.stack.slice(0,this.state.stack.length-1)});
  },

  renderContent(){
    if (this.state.display == 'mates'){
      return <SortableList onObjMoved={this.mateMoved} items={this.state.mates} onClicked={this.mateClicked} />
    } else {
      return <SortableList  onObjMoved={this.traitMoved} items={this.state.traits} />;
    }
  },

  clear(){
    if (!confirm('Clear?')) return;
    GrowLight.clear();
  },

  render() {
    var top = this.state.stack[this.state.stack.length - 1];
    return (
      <div>{
        top && React.createElement(top.class, top.props) || (
          <div>
            <header className="bar bar-nav">
              <button className="btn pull-right" onClick={this.addThing}>Add</button>
              <button className="btn pull-left" onClick={this.toggleDisplay}>...</button>
              <h1 onClick={this.clear} className="title clickable">{this.state.display}</h1>
            </header>
            <div className="content">{ this.renderContent() }</div>
          </div>
        )
      }</div>
    )
  }
})

React.render(
  <App />,
  document.body
);
