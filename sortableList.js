var SortableList = React.createClass({
  mixins: [SortableMixin],

  handleSort(evt) {
    console.log('moved', evt.oldIndex, evt.newIndex)
    this.key = (this.key || 0) + 1;
    this.props.onObjMoved(evt.oldIndex, evt.newIndex)
  },

  rowClicked(evt){
    this.props.onClicked(evt.target.getAttribute('itemID'))
  },

  sortableOptions: {
    handle: ".handle",
    alwaysRevert: true,
  },

  // key={this.key || 0}

  render() {
      return <ul className="table-view reorderable">{
          (this.props.items||[]).map((mate) => {
              return <li key={mate.id} onClick={this.rowClicked} className="table-view-cell clickable" itemID={mate.id}>{mate.name}<div className="handle">#</div></li>
          })
      }</ul>
  }

})
