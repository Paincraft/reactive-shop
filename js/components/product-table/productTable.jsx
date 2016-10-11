import React from 'react';
import template from '../../templates/product-table/productTableTemplate.jsx';
import ProductRow from './productRow.jsx';

export default class ProductTable extends React.Component{
  render(){
    this.products = this.props.data.map(function(product){
      return (
        <ProductRow name={product.name} description={product.description}/>
      )
    })

    this.render = template.bind(this);
    return this.render();
  }
}
