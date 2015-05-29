'use strict';

var DateCard = React.createClass({
  done(){ this.props.navigator.pop() },

  setTimeframe(tf){
    this.props.date.timeframe = tf
    db.store(this.props.date)
  },

  viewMate(){
    this.props.navigator.push(MateCard, { mate: this.props.date.mate })
  },

  selectArchtypes(title, attr){
    var date = this.props.date
    if (!date[attr]) date[attr] = {}
    var selected = date[attr];
    this.props.navigator.push(SelectList, {
      title: title,
      options: db.archtypes(),
      selected: selected,
      onDone: (added,removed) => {
        added.forEach( (k) => (selected[k] = true) )
        removed.forEach( (k) => {delete selected[k]} )
        db.store(date)
      }
    })
  },

  editMateArchtypes(){
    this.selectArchtypes("What does "+this.props.date.mate+" want to be?",  "mateArchtypes")
  },

  editMyArchtypes(){
    this.selectArchtypes("What do I need to be?", "myArchtypes")
  },

  rm(){
    if (!confirm('Sure?')) return
    db.rm(this.props.date.id)
    this.done()
  },

  render(){
    var date = this.props.date
    var mateArchtypes = Object.keys(date.mateArchtypes||{})
    var myArchtypes = Object.keys(date.myArchtypes||{})
    console.log(date);

    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-right" onClick={this.done}>Done</button>
          <h1 className="clickable title"
              onClick={this.viewMate}
          >
            with {date.mate}
          </h1>
        </header>
        <div className="content">

          <Tabs
            options={db.timeframes()}
            value={date.timeframe}
            onClick={this.setTimeframe}
          />

          <ul className="table-view">
            <li className="table-view-divider">
              {date.mate} will become...
              <button
                className="btn btn-primary pull-right"
                onClick={this.editMateArchtypes}>edit
              </button>
            </li>
            {
              mateArchtypes.map(t => <li className="table-view-cell clickable">{t}</li>)
            }


            <li className="table-view-divider">
              When I am
              <button
                className="btn btn-primary pull-right"
                onClick={this.editMyArchtypes}>edit
              </button>
            </li>
            {
              myArchtypes.map(t => <li className="table-view-cell clickable">{t}</li>)
            }

          </ul>

          <button className="btn btn-block btn-negative" onClick={this.rm}>Delete</button>

        </div>

      </div>
    )
  }

});
