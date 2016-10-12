import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/productList.jsx';

var data = [
  {key: 1, name: 'test1', description: '...'},
  {key: 2, name: 'test2', description: ',,,'}
]

export default function renderView(){
  ReactDOM.render(<ProductList products={data}/>, document.getElementById('container'));
}
