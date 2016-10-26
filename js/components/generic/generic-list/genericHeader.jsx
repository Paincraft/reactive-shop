import React from 'react';
import template from './templates/genericHeaderTemplate.jsx';
import classNames from 'classnames';

export default class GenericHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
      cssClasses: classNames(this.props.classList),
      cssClassesContent: classNames({'hidden': this.collapsed})
    };
    this.setCssClasses = function(state){
      return {
        cssClasses: classNames(state.classList),
        cssClassesContent: classNames({'hidden': state.collapsed})
      }
    }
  }

  handleClick(event) {
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick.call(this, event)
  }

  componentWillReceiveProps(nextProps){
      let newState = {collapsed: nextProps.collapsed};
      let classObj = this.setCssClasses(nextProps);
      newState.cssClasses = classObj.cssClasses;
      newState.cssClassesContent = classObj.cssClassesContent;
      this.setState(newState);
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
