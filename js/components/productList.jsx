import React from 'react';
import GenericList from './generic/generic-list/genericList.jsx';
import Product from '../templates/ProductTemplate.jsx';
import Search from './generic/generic-search/genericSearch.jsx'
//import template from '../../templates/product-table/productTableTemplate.jsx';
//import ProductRow from './productRow.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      classList: ['productList'],
      rowClassList: ['productRow'],
      headerClassList: ['listHeader'],
      rowWrapperClassList: ['rowWrapper']
    };
  }

  render() {
    let searchLabel = 'search: ';

    let headerContent = (
      <div>
        <Search searchLabel={searchLabel}/>
      </div>
    )

    let products = this.props.products.map(function(product) {
      return Product.getTemplate(product);
    });

    let genericListOpts = {
      headerTitle: 'header title',
      headerContent: headerContent,
      headerClassList: this.state.headerClassList,
      headerOnClickCallback: function() {},
      rows: products,
      rowWrapperClassList: this.state.rowWrapperClassList,
      rowClassList: this.state.rowClassList,
      rowOnClickCallback: function() {},
      classList: this.state.classList,
      cssPath: 'js/components/generic/generic-list/css/generic-list.css',
      collapsed: false,
      collapsible: true
    }

    let headerTitle = 'header title';
    let rowOnClickCallback = function() {};
    let headerOnClickCallback = function() {};
    return (<GenericList id="productList" opts={genericListOpts}/>);
  }
}
