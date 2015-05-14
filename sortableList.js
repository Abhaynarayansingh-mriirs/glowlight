var SortableList = React.createClass({
  mixins: [SortableMixin],

  handleSort(evt) {
    this.props.onObjMoved(evt.oldIndex, evt.newIndex)
  },

  rowClicked(evt){
    this.props.onClicked(evt.target.getAttribute('itemID'))
  },

  sortableOptions: {
    handle: ".handle"
  },

  render() {
      return <ul className="table-view">{
          (this.props.items||[]).map((mate) => {
              return <li onClick={this.rowClicked} className="table-view-cell" itemID={mate.id}>{mate.name}<div className="handle">#</div></li>
          })
      }</ul>
  }

})
