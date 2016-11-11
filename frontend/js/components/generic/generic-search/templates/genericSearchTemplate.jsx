import React from 'react';

export default function() {
  return (
    <span>
      <span>{this.props.searchLabel}</span>
      <input type="text" onKeyUp={this.handleOnKeyUp.bind(this)}/>
    </span>
  )
}
