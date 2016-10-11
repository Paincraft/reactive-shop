import React from 'react';
import ReactDOM from 'react-dom';
import ProductTable from './components/product-table/productTable.jsx';

var data = [
  {name: 'test1', description: '...'},
  {name: 'test2', description: ',,,'}
]

export default function renderView(){
  ReactDOM.render(<ProductTable data={data}/>, document.getElementById('container'));
}
