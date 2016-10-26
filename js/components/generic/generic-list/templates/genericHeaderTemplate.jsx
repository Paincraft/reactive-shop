import React from 'react';

export default function() {
  return (
    <div className={this.state.cssClasses}>
      <p onClick={this.handleClick.bind(this)}>{this.props.title}</p>
      <div className={this.state.cssClassesContent}>
        {this.props.content}
      </div>
    </div>
  )
}
