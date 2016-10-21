import React from 'react';
import templateFunction from './templates/genericRowTemplate.jsx';
import classNames from 'classnames';

export default class GenericRow extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      hidden: false
    };
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick.call(this)
  }

  render() {
    this.cssClasses = classNames(this.props.classList, {
      active: this.state.active
    }, {hidden: this.state.hidden});
    let template = templateFunction.bind(this);
    return template();
  }
}
