import React from 'react';
import template from '../../templates/generic-list/genericRowTemplate.jsx';

export default class GenericRow extends React.Component{
  render(){
    this.render = template.bind(this);
    return this.render();
  }
}
