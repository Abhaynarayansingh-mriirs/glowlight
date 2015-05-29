'use strict';
React.initializeTouchEvents(true)




var App = React.createClass({
  getInitialState() {
    db.onChange = () => {
      this.setState({items: db.items})
    }
    return {
      stack: [],
      items: db.items
    }
  },

  addThing() {
    this.push(PickList, {
      options: db.mates(),
      onPick: (mate) => {
        this.supplant(DateCard, {
          dateID: db.store({ mate: mate })
        })
      }
    })
  },

  push(cls, props){
    var obj = { class: cls, props: props||{} }
    obj.props.navigator = this
    this.setState({stack: this.state.stack.concat([obj])});
  },

  pop(){
    this.setState({stack: this.state.stack.slice(0,this.state.stack.length-1)});
  },

  supplant(cls, props){
    var obj = { class: cls, props: props||{} }
    obj.props.navigator = this
    this.state.stack[this.state.stack.length - 1] = obj
    this.setState({stack: this.state.stack});
  },

  renderModal(){
    var top = this.state.stack[this.state.stack.length - 1];
    if (!top) return null;
    if (top.props.dateID) top.props.date = db.items[top.props.dateID]
    return React.createElement(top.class, top.props)
  },

  renderApp(){
    return <div>
      <header className="bar bar-nav">
        <button className="btn pull-right" onClick={this.addThing}>Add</button>
      </header>
      <div className="content">
        <Fate navigator={this}/>
      </div>
    </div>
  },

  render() {
    return <div>{ this.renderModal() || this.renderApp() }</div>
  }
})

React.render(
  <App />,
  document.body
);
