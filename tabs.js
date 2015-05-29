var Tabs = React.createClass({
  clicked(evt){
    this.props.onClick(evt.currentTarget.innerHTML)
  },

  render(){
      return (
        <div className="segmented-control">{
          this.props.options.map((o)=>{
            return <a className={"control-item clickable " + (o == this.props.value ? "active" : "")} onClick={this.clicked}>{o}</a>
          })
        }
        </div>
      )
  }
})
