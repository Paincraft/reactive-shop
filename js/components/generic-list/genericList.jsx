import React from 'react';
import template from '../../templates/generic-list/genericListTemplate.jsx';
import GenericRow from './genericRow.jsx';

export default class GenericList extends React.Component{
  render(){
    function parseClasses(classList){
      return classList.reduce((curr,prev) => {
        return `${curr} ${prev}`;
      });
    }

    let rowClassList = parseClasses(this.props.rowClassList);

    this.classList = parseClasses(this.props.classList);
    this.rows = this.props.rows.map(function(content,idx){
      return (
        <GenericRow key={idx} content={content} classList={rowClassList} />
      )
    })

    this.render = template.bind(this);
    return this.render();
  }
}
