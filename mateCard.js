'use strict';

var MateCard = React.createClass({
  done(){ this.props.navigator.pop() },

  add(){
    this.props.navigator.push(DateCard, {
      dateID: db.store({ mate: this.props.mate })
    })
  },

  render(){
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-right" onClick={this.done}>Done</button>
          <button className="btn pull-left" onClick={this.add}>Add</button>
          <h1>{this.props.mate}</h1>
        </header>
        <div className="content">
          <Fate mate={this.props.mate} navigator={this.props.navigator}/>
        </div>
      </div>
    )
  }

})
