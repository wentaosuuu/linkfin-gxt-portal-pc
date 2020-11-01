import React, {Component} from 'react';
import Icon from '../icon'
export default class Popup extends Component {
  state = {
    show: false
  }
  setDisplay = (flag) => {
    this.setState({show: flag})
  }
  
  render (){
    const { option } = this.props;
    const vm = this;
    function wrapClick (e){
      e.stopPropagation();
      if (e.target.className == 'popup-wrap' && option.canClickClose) {
        vm.setDisplay(false);
      }
    }
    return <div className="popup-container" style={{"display": this.state.show ? "block" : "none"}}>
      <div className="popup-wrap" onClick={wrapClick}>
        <div className={`popup-box ${option.size || ''} ${option.smallScreen ? 'smallscreen' : ''}`}>
          {
            option.showCloseBtn ? <Icon type="close" onClick={this.setDisplay.bind(this, false)} /> : <></>
          }
          <div className="popup-title" style={{display: option.title ? 'block' : 'none'}}>
            {
              option.title || ""
            }
          </div>
          <div className="popup-body">
            {
              this.props.children || ""
            }
          </div>
          <div className="popup-footer"></div>
        </div>
      </div>
    </div>
  };
}