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
export default class EnchancedLi extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
        return classNames(this.props.classList, {collapsible: this.props.collapsible, active: state.active, collapsed: state.collapsed, hovered: state.hover})
    }

    this.state = {
      active: false,
      hover: false,
      currentActiveElement: this.props.currentActiveChild,
      collapsed: true
    };
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    let eventkey = event.target.attributes.getNamedItem('data-eventkey');
    if(eventkey &&  eventkey.value === this.props.eventkey){
      let newState = {
        active: true,
        collapsed: (this.props.collapsible) ? !this.state.collapsed : true
      }
      newState.cssClasses = this.setCssClasses(newState);
      this.setState(newState);
    }
    if (this.props.onClick && typeof this.props.onClick === 'function' && eventkey)
      this.props.onClick.call(this, event, this.props.eventkey, this.props.parentsList);
  }

  handleOnMouse(event){
    event.preventDefault();
    if(this.props.hoverable){
      let newState;
      let eventkey = event.target.attributes.getNamedItem('data-eventkey');
      //console.log('hover', event.target, event.target.attributes.getNamedItem('data-eventkey'), thisEventkey);
      if(eventkey &&  eventkey.value === this.props.eventkey){
        newState = Object.create(this.state);
        newState.hover = (event.type === 'mouseover') ? true : false;
        newState.cssClasses = this.setCssClasses(newState);
        this.setState(newState);
      }
    }
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  componentWillReceiveProps(nextProps, nextState){
    let newState = {
      currentActiveElement: nextProps.currentActiveChild
    }
    if(nextProps.currentActiveChild !== this.props.eventkey){
      newState.active = false;
      if(!(nextProps.currentActiveChildParentsList && nextProps.currentActiveChildParentsList.includes(this.props.eventkey)) && nextProps.collapseOnChange){
        newState.collapsed = true;
      }else{
        newState.collapsed = this.state.collapsed;
      }
      newState.cssClasses = this.setCssClasses(newState);
      this.setState(newState);
    }
  }

  componentWillUpdate(props,state){
    //console.log('child update', this.props.eventkey,props, state);
  }

  render() {
    return (
      <li onMouseOver={this.handleOnMouse.bind(this)} onMouseOut={this.handleOnMouse.bind(this)} onClick={this.handleClick.bind(this)} className={this.state.cssClasses} data-eventkey={this.props.eventkey}>{this.props.category} {this.props.submenu}</li>
    )
  }
}
