import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import EnchancedBasicElement from '../base/EnchancedBasicElement.jsx';
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
export default class GenericCategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
        return classNames(this.props.classList, {collapsible: this.props.collapsible, collapsed: state.collapsed})
    }
    this.state = {
      active: false,
      currentActiveElement: this.props.currentActiveChild,
      collapsed: true
    };
  }

  handleClick(event, eventkey, state) {
    event.preventDefault();
    event.stopPropagation();
    if(eventkey &&  eventkey === this.props.eventkey){
      let newState = {
        active: true,
        collapsed: (this.props.collapsible) ? !this.state.collapsed : true
      }
      newState.cssClasses = this.setCssClasses(newState);
      this.setState(newState);
    }
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick(event, this.props.eventkey, this.props.parentsList);
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  componentWillReceiveProps(nextProps){
    let deactivateChild = false;
    let newState = {
      currentActiveElement: nextProps.currentActiveChild
    }
    if(nextProps.currentActiveChild !== this.props.eventkey && nextProps.currentActiveChild !== this.state.currentActiveElement){
      newState.active = false;
      if(!(nextProps.currentActiveChildParentsList && nextProps.currentActiveChildParentsList.includes(this.props.eventkey)) && nextProps.collapseOnChange){
        newState.collapsed = true;
      }else{
        newState.collapsed = this.state.collapsed;
      }
      newState.cssClasses = this.setCssClasses(newState);
    }
    //if(this.props.eventkey === 'number1root0level1') console.log('genericCategoryItem active set', nextProps, newState)
    if(this.props.eventkey === 'number1root0level1') console.log('deactivate', deactivateChild, nextProps.currentActiveChild, this.state.currentActiveElement)
    this.setState(newState);
  }

  componentWillUpdate(props,state){
    //if(this.props.eventkey === 'number1root0level1') console.log('child update', this.props.eventkey, props, state);
  }

  render() {
    return (
      <EnchancedBasicElement clickable={false} active={this.state.active} hoverable={this.props.hoverable} onClick={this.handleClick.bind(this)} classList={this.state.cssClasses} element={'li'} eventkey={this.props.eventkey} content={[this.props.category, this.props.submenu]} />
    );
  }
}
