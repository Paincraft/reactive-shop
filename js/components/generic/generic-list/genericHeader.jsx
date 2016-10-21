import React from 'react';
import templateFunction from './templates/genericHeaderTemplate.jsx';
import classNames from 'classnames';

export default class GenericHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      collapsed: false
    };
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
      collapsed: (this.props.collapseable)
        ? !this.state.collapsed
        : false
    });
    console.log(this.state.collapsed);
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick.call(this)
  }

  render() {
    this.cssClasses = classNames(this.props.classList, {'active': this.state.active});
    this.contentCss = classNames({'hidden': this.state.collapsed});
    let template = templateFunction.bind(this);
    return template();
  }
}
