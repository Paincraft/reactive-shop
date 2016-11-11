import React from 'react';
import _ from 'lodash';
import template from './templates/genericSearchTemplate.jsx';

export default class GenericSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      classList: []
    };
  }

  handleOnKeyUp(event) {
    if (this.props.onKeyUp && typeof this.props.onKeyUp === 'function')
      this.props.onKeyUp.call(this, event)
  }

  componentWillMount() {
    if (Array.isArray(this.props.searchClassList))
      this.setState({classList: this.props.searchClassList})
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
