var MateCard = React.createClass({

  style(){
    if (!this.props.mate) return {display:"none"};
    else return {};
  },

  addWantsToBeTrait(){
    var trait = prompt('Trait');
    GrowLight.setTrait(this.props.mate, trait, 'wantsToBe')
  },

  addExpandsAroundTrait(){
    var trait = prompt('Trait');
    GrowLight.setTrait(this.props.mate, trait, 'expandsAround')
  },

  addExcitedByTrait(){
    var trait = prompt('Trait');
    GrowLight.setTrait(this.props.mate, trait, 'excitedBy')
  },


  render(){
    if (!this.props.mate) return null;
    var traits = GrowLight.mate(this.props.mate).traits || {}
    console.log(traits);

    return <div style={this.style()}>
        <div onClick={this.props.onHidden} onTouchEnd={this.props.onHidden} className="hovermodalbackdrop"></div>
        <div className="hovermodal">
          <div className="content-padded">
            <h1>{this.props.mate}</h1>
          </div>

          <ul className="table-view">{
            Object.keys(traits).map((t) => {
              return <li className="table-view-cell"><b>{t}</b> {traits[t]}</li>
            })
          }</ul>

          <button className="btn btn-block" onClick={this.addWantsToBeTrait}> wants to be...</button>
          <button className="btn btn-block" onClick={this.addExpandsAroundTrait}>expands around...</button>
          <button className="btn btn-block" onClick={this.addExcitedByTrait}>excited by...</button>
        </div>
      </div>
  }

})
