'use strict';

var PickList = React.createClass({
  add(){
    var x = prompt('What?')
    if (!x) return
    this.props.onPick(x)
  },

  picked(evt){
    this.props.onPick(evt.currentTarget.getAttribute('itemID'))
  },

  render(){
    return <div>
      <header className="bar bar-nav">
        <button className="btn pull-right" onClick={this.add}>Add</button>
        <h1>Choose</h1>
      </header>
      <div className="content table-view">{
        this.props.options.map(o => {
          return <li
            itemID={o}
            className="table-view-cell clickable"
            onClick={this.picked}
          >{o}</li>
        })
      }</div>
    </div>
  }
})
