import React from 'react';
import ShadowDOM from 'react-shadow';

export default function() {
  return (
    <li onMouseOver={this.handleOnMouseOver.bind(this)} onMouseOut={this.handleOnMouseOut.bind(this)} onClick={this.handleClick.bind(this)} className={this.state.cssClasses} data-eventkey={this.props.eventkey}>{this.props.category} {this.props.submenu}</li>
  )
}

//onMouseOver={this.handleOnMouseOver.bind(this)} onMouseOut={this.handleOnMouseOut.bind(this)}
