import React from 'react';
import GenericRow from '../genericRow.jsx';
import GenericHeader from '../genericHeader.jsx';
import ShadowDOM from 'react-shadow';

export default function() {
  return (
    <ShadowDOM include={[this.props.opts.cssPath]}>
      <div>
        <div className={this.props.opts.classList} id={this.props.id}>
          <GenericHeader title={this.props.opts.headerTitle} content={this.props.opts.headerContent} classList={this.props.opts.headerClassList} collapseable={this.props.opts.collapseable || true} onClick={this.headerOnClickCallbackWrapper(this)}/>
          <div>
            {this.props.opts.rows.map((content, idx) => {
              return (<GenericRow key={idx} content={content} classList={this.state.rowClassList} onClick={this.props.opts.rowOnClickCallback}/>)
            })}
          </div>
        </div>
      </div>
    </ShadowDOM>
  )
}
