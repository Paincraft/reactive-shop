import React from 'react';
import _ from 'lodash';
import template from './templates/genericMenuTemplate.jsx';
import classNames from 'classnames';

const TOP = Symbol.for('top');
const BOTTOM = Symbol.for('bottom');
const LEFT = Symbol.for('left');
const RIGHT = Symbol.for('right');

export default class GenericMenu extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
      return classNames(this.props.classList, {
        collapsible: this.props.collapsible,
        collapsed: state.collapsed,
        top: (state.position === TOP),
        bottom: (state.position === BOTTOM),
        left: (state.position === LEFT),
        right: (state.position === RIGHT)
      })
      this.state = {}
    }

    this.state = {
      position: (this.props.position === TOP || this.props.position === BOTTOM || this.props.position === LEFT || this.props.position === RIGHT) ? this.props.position : TOP,
      collapsed: false
    };
  }

  handleOnKeyUp(event) {
    if (this.props.onKeyUp && typeof this.props.onKeyUp === 'function')
      this.props.onKeyUp.call(this, event)
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
