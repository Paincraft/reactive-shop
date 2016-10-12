import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/productList.jsx';

var data = [
  {name: 'test1', description: '...'},
  {name: 'test2', description: ',,,'}
]

export default function renderView(){
  ReactDOM.render(<ProductList products={data}/>, document.getElementById('container'));
}
