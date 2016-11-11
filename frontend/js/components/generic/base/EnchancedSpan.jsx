import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default class EnchancedSpan extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
        return classNames(this.props.classList, {active: state.active})
    }

    this.state = {
      active: false,
    };
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if(this.props.disableClick !== true){
      let eventkey = event.target.attributes.getNamedItem('data-eventkey');
      if(eventkey &&  eventkey.value === this.props.eventkey){
        let newState = {
          active: !this.state.active
        }
        newState.cssClasses = this.setCssClasses(newState);

        this.setState(newState);
      }
    }
    if (this.props.onClick && typeof this.props.onClick === 'function' && eventkey)
      this.props.onClick.call(this, event, this.props.eventkey, this.props.parentsList);
  }

  handleOnMouse(event){
    event.preventDefault();
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  componentWillReceiveProps(nextProps, nextState){

  }

  componentWillUpdate(props,state){
    //console.log('child update', this.props.eventkey,props, state);
  }

  render() {
    return (
      <span className={this.state.cssClasses} data-eventkey={this.props.eventkey} onClick={this.handleClick.bind(this)}>{this.props.content}</span>
    )
  }
}
