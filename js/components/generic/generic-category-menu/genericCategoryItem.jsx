import React from 'react';
import _ from 'lodash';
import template from './templates/genericCategoryItemTemplate.jsx';
import classNames from 'classnames';

export default class GenericCategoryItem extends React.Component {
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
    console.log(event.target)
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

  handleOnMouseOver(event){
    event.preventDefault();
    if(this.props.hoverable){
      let newState;
      let eventkey = event.target.attributes.getNamedItem('data-eventkey');
      //console.log('hover', event.target, event.target.attributes.getNamedItem('data-eventkey'), thisEventkey);
      if(eventkey &&  eventkey.value === this.props.eventkey){
        newState = Object.create(this.state);
        newState.hover = true;
        newState.cssClasses = this.setCssClasses(newState);
        this.setState(newState);
      }
    }
  }

  handleOnMouseOut(event){
    event.preventDefault();
    if(this.props.hoverable){
      let newState;
      let eventkey = event.target.attributes.getNamedItem('data-eventkey');
      //console.log('hover', event.target, event.target.attributes.getNamedItem('data-eventkey'), thisEventkey);
      if(eventkey &&  eventkey.value === this.props.eventkey){
        newState = Object.create(this.state);
        newState.hover = false;
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
    this.render = template.bind(this);
    return this.render();
  }
}


/*function handleHover(event, hovered, thisEventkey){
  event.preventDefault();
  let newState;
  let eventkey = event.target.attributes.getNamedItem('data-eventkey');
  console.log('hover', event.target, event.target.attributes.getNamedItem('data-eventkey'), thisEventkey);
  if(eventkey &&  eventkey.value === thisEventkey){
    console.log('hover1', newState);
    newState = {
      hover: hovered
    }
    console.log('hover2', newState);
  }
  console.log('hover3', newState);
  return newState;
}*/

/*handleOnMouseOver(event){
  if(this.props.hoverable){
    let newState = handleHover(event, true, this.props.eventkey);
    if(newState){
      newState.cssClasses = this.setCssClasses(newState);
      console.log('hover4', newState);
      this.setState(newState);
    }
  }
}

handleOnMouseOut(event){
  if(this.props.hoverable){
    let newState = handleHover(event, false, this.props.eventkey);
    if(newState){
      newState.cssClasses = this.setCssClasses(newState);
      this.setState(newState);
    }
  }
}*/
