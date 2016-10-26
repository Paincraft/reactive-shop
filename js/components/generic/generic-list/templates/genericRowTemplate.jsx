import React from 'react';

export default function() {
  return (
    <div className={this.state.cssClasses} onClick={this.handleClick.bind(this)}>
      {this.props.content}
    </div>
  )
}
