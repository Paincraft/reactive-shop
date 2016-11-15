import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../../helpers/helpers.jsx';

/*props{
  opts: {
    collapsible: boolean,
    collapsed: boolean,
    classList: [],
    headerTitle: '',
    headerContent: Element,
    headerClassList: [],
    rowClassList: [],
    content: [Element]
  }
}
*/

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
    let componentUI = (
      <div className={this.props.opts.classList} id={this.props.id}>
        <GenericHeader title={this.props.opts.headerTitle} content={this.props.opts.headerContent} classList={this.props.opts.headerClassList} collapsed={this.state.collapsed} onClick={this.headerOnClickCallbackWrapper(this)}/>
        <div className={classNames(this.props.opts.rowWrapperClassList)}>
          {this.props.opts.rows.map((content, idx) => {
            return (<GenericRow key={idx} content={content} classList={this.props.opts.rowClassList} hidden={this.state.collapsed} onClick={this.props.opts.rowOnClickCallback}/>)
          })}
        </div>
      </div>
    )
    if(this.props.enableShadowRoot) Helpers.wrapInShadowRoot(componentUI);
    return componentUI;
  }
}
