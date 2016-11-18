import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
/*
props{
  classList: [],
  collapsible: boolean,
  hoverable: boolean,
  currentActiveChild: Element,
  onClick: function,
  eventkey: '',
  category: '',
  submenu: Element,
  parentsList: [],
  currentActiveChildParentsList,
}
*/
export default class EnchancedBasicElement extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
        return classNames(this.props.classList, {collapsible: this.props.collapsible, active: state.active, hovered: state.hover})
    }

    this.state = {
      active: (this.props.clickable && this.props.clickable === true) ? false : this.props.active,
      hover: false,
    };
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    let newState = {};
    if(this.props.clickable){
      newState.active = !this.state.active;
      this.setState(newState);
    }
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick(event, this.props.eventkey, Object.assign(this.state, newState));
  }

  handleOnMouse(event){
    event.preventDefault();
    event.stopPropagation();
    let newState = {};
    if(this.props.hoverable){
      newState.hover = (event.type === 'mouseover') ? true : false;
      this.setState(newState);
    }
    if(this.props.onMouseOver && typeof this.props.onMouseOver === 'function' && event.type === 'mouseover'){
      this.props.onMouseOver(event, this.props.eventkey, Object.assign(this.state, newState));
    }else if(this.props.onMouseLeave && typeof this.props.onMouseLeave === 'function' && event.type === 'mouseleave'){
      this.props.onMouseLeave(event, this.props.eventkey, Object.assign(this.state, newState));
    }
  }

  componentWillMount(){
    this.cssClasses = this.setCssClasses(this.state);
  }

  componentWillReceiveProps(nextProps){
    let newState = {};
    if(!this.props.clickable) newState.active = nextProps.active;
    this.setState(newState);
  }

  componentWillUpdate(nextProps, nextState){
    this.cssClasses = this.setCssClasses(nextState);
  }

  render() {
    let props = {
      onMouseOver: this.handleOnMouse.bind(this),
      onMouseLeave: this.handleOnMouse.bind(this),
      onClick: this.handleClick.bind(this),
      className: this.cssClasses,
      'data-eventkey': this.props.eventkey,
      key: this.props.eventkey
    }

    return React.createElement(this.props.element, props, this.props.content);
  }
}
