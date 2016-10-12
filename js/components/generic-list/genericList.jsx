import React from 'react';
import template from '../../templates/generic-list/genericListTemplate.jsx';
import GenericRow from './genericRow.jsx';

export default class GenericList extends React.Component{
  render(){
    let rowClassList = this.props.rowClassList.reduce((curr,prev) => {
      return `${curr} ${prev}`;
    });

    this.classList = this.props.classList.reduce((curr,prev) => {
      return `${curr} ${prev}`;
    });

    this.rows = this.props.rows.map(function(content){
      return (
        <GenericRow content={content} classList={rowClassList} />
      )
    })
    this.render = template.bind(this);
    return this.render();
  }
}
