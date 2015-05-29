'use strict';

function clone(obj){
  var obj2 = {};
  for (var k in obj) obj2[k] = obj[k];
  return obj2;
}


var SelectList = React.createClass({
  getInitialState(){
    return {
      options: this.props.options.slice(0),
      selected: clone(this.props.selected)
    }
  },

  add(){
    var what = prompt('What?')
    if (!what) return
    this.state.selected[what] = true
    this.setState({
      options: this.state.options.concat([what]),
      selected: this.state.selected
    })
  },

  done(){
    var added = [], removed = []
    for (var k in this.state.selected){
      if (this.props.selected[k] && !this.state.selected[k]){
        removed.push(k)
      } else if (this.state.selected[k] && !this.props.selected[k]){
        added.push(k)
      }
    }
    this.props.onDone(added, removed)
    this.props.navigator.pop()
  },

  toggle(evt){
    console.log(evt.currentTarget)
    var item = evt.currentTarget.getAttribute('itemID')
    this.state.selected[item] = !this.state.selected[item]
    this.setState({
      selected: this.state.selected
    })
  },

  render() {
    console.log(this.state)
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left" onClick={this.add}>Add</button>
          <button className="btn pull-right" onClick={this.done}>Done</button>
          <h1>Choose</h1>
        </header>
        <div className="content">
          <h2>{this.props.title}</h2>
          <ul className="table-view">{
              this.state.options.map((option) => {
                return (
                  <li
                    key={option.id || option}
                    onClick={this.toggle}
                    className="table-view-cell clickable"
                    itemID={option.id || option}
                    >
                    {option.name || option}
                    <div className={this.state.selected[option.id || option] ? 'toggle active' : 'toggle'}>
                      <div className="toggle-handle"></div>
                    </div>
                  </li>
                )
              })
            }</ul>
        </div>
      </div>
    )
  }
});
