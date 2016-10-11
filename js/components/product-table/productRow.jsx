import React from 'react';
import template from '../../templates/product-table/productRowTemplate.jsx';

export default class ProductRow extends React.Component{
  render(){
    this.render = template.bind(this);
    return this.render();
  }
}
