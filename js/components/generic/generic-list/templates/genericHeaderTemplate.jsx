import React from 'react';

export default function() {
  return (
    <div className={this.cssClasses}>
      <p onClick={this.handleClick.bind(this)}>{this.props.title}</p>
      <div className={this.contentCss}>
        {this.props.content}
      </div>
    </div>
  )
}
