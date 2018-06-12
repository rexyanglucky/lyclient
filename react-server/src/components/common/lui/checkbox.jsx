import React, { Component } from 'react';
import "./css/index.less";
class Checkbox extends Component {
  constructor(props) {
    super(props);
    const { label, value,key,check } = props;
    this.state = {
      label: label,
      value: value,
      check: check,
    }
    this.click = this.click.bind(this);
  }
  click(item) {
    this.setState({
      check: !this.state.check
    },()=>{
      this.props.clickCallback(this.state)
    })
  }
  render() {
    const chkChecked = this.state.check ? 'chk-checked' : '';
    return (<span className={`chk-normal ${chkChecked}`} onClick={()=>this.click(this.state)} value={this.state.value}>
      <span className="chk-check"></span><span className="chk-label">{this.state.label}</span>
    </span>);

  }
}
export default Checkbox;