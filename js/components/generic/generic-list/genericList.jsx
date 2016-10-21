import React from 'react';
import _ from 'lodash';
import template from './templates/genericListTemplate.jsx';

export default class GenericList extends React.Component {
  constructor() {
    super();
    this.state = {
      rowClassList: []
    };
  }

  headerOnClickCallbackWrapper(rootCtx) {
    return () => {
      rootCtx.hideRows();
      if (this.props.opts.headerOnClickCallback && typeof this.props.opts.headerOnClickCallback === 'function') {
        this.props.opts.headerOnClickCallback.call(this);
      }
    }
  }

  hideRows() {
    let newArr = this.state.rowClassList;
    if (!this.state.rowClassList.includes("hidden")) {
      newArr.push('hidden');
    } else {
      _.pull(newArr, 'hidden');
    }
    this.setState({rowClassList: newArr});
  }

  componentWillMount() {
    this.setState({rowClassList: this.props.opts.rowClassList})
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
