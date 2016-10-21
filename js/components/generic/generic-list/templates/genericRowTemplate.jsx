import React from 'react';

export default function() {
  return (
    <div className={this.cssClasses} onClick={this.handleClick.bind(this)}>
      {this.props.content}
    </div>
  )
}
