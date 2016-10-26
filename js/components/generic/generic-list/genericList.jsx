import React from 'react';
import _ from 'lodash';
import template from './templates/genericListTemplate.jsx';
import classNames from 'classnames';

export default class GenericList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.opts.collapsible ? this.props.opts.collapsed : false
    };
  }

  //callback passesd and bound to child, rootCtx is this (GenericList)
  headerOnClickCallbackWrapper(rootCtx) {
    return () => {
      if(this.props.opts.collapsible)
        rootCtx.hideRows();
      if (this.props.opts.headerOnClickCallback && typeof this.props.opts.headerOnClickCallback === 'function') {
        this.props.opts.headerOnClickCallback.call(this, event);
      }
    }
  }

  hideRows() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
