'use strict';

var DateCell = React.createClass({

  render(){
    var item = this.props.item
    var myArchtypes = Object.keys(item.myArchtypes).join(', ')
    var mateArchtypes = Object.keys(item.mateArchtypes).join(', ')

    var inside = <div>
      <b>{myArchtypes}</b> to <b>{item.mate}</b>
      <p> making room for {mateArchtypes} </p>
    </div>

    if (!myArchtypes) inside = <div>
      Could <b>{item.mate}</b> be {mateArchtypes}?
    </div>

    return <li
      itemID={item.id}
      className="table-view-cell clickable"
      onClick={this.showDate}
    >{inside}
    </li>
  }

})

var Fate = React.createClass({
  showDate(evt){
    this.props.navigator.push(DateCard, {
      dateID: evt.currentTarget.getAttribute('itemID')
    })
  },

  render(){
    var fate = db.byTimeframe(this.props.mate)
    console.log(fate)
    return <div className="table-view">{
      db.timeframes().map(tf => {
        if (!fate[tf]) return null;
        return <div>
          <li className="table-view-divider">{tf}</li>
          {fate[tf].map(item => <DateCell item={item}/>)}
        </div>
      })
    }</div>
  }
})
