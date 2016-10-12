import React from 'react';
import GenericList from './generic-list/genericList.jsx';
import Product from '../templates/ProductTemplate.jsx';
//import template from '../../templates/product-table/productTableTemplate.jsx';
//import ProductRow from './productRow.jsx';

export default class ProductList extends React.Component {
  render() {
    let products = this.props.products.map(function(product){
        return Product.getTemplate(product);
    });
    let classList = ['productList'];
    let rowClassList = ['productRow'];
    return (<GenericList rows={products} classList={classList} rowClassList={rowClassList}/>);
  }
}
