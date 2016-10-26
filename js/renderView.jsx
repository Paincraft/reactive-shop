import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/productList.jsx';
import Category from './components/generic/generic-category-menu/genericCategoryMenu.jsx';
import Menu from './components/generic/generic-menu/genericMenu.jsx';
import Helpers from './helpers/helpers.jsx';

let data = [
  {
    key: 1,
    name: 'test1',
    description: '...'
  }, {
    key: 2,
    name: 'test2',
    description: ',,,'
  }
]

let categories = {
  categoryLevel1: {
    subCategoryLevel1_1:'subCategoryLevel1_1',
    subCategoryLevel1_2:'subCategoryLevel1_2'
  },
  categoryLevel1_1: {subCategoryLevel1_1: {subCategoryLevel2: 'subCategoryLevel2'}},
  categoryLevel1_2: 'categoryLevel1_2'
}

let menuItems = ['home','porn','about'];
//here we implement logic
function initGenerator() {
  return Helpers.createKeyGenerator(0,(key) => {
    return ++key;
  });
}

export default function renderView() {
  /*ReactDOM.render(
  <ProductList products={data} collapsible={true}/>
    <Menu classList={['menu']} menuItems={menuItems} keyIterator={initGenerator()} cssPath={'js/components/generic/generic-menu/css/generic-menu.css'}
    listElementClassList={['list-element']} wrapperClassList={''} />

    <Category categories={categories} keyIterator={initGenerator()} classList={['']}
    listElementClassList={['list-element']} cssPath={'js/components/generic/generic-category-menu/css/generic-category-menu.css'} enableShadowRoot={true}/>

    */
  ReactDOM.render(
    <Menu classList={['menu']} menuItems={menuItems} keyIterator={initGenerator()} cssPath={'js/components/generic/generic-menu/css/generic-menu.css'}
    listElementClassList={['list-element']} wrapperClassList={''} collapsible={false} position={Symbol.for('top')}/>
    , document.getElementById('menu')
  );

  ReactDOM.render(
    <Category categories={categories} keyIterator={initGenerator()} classList={['']}
    listElementClassList={['list-element']} cssPath={'js/components/generic/generic-category-menu/css/generic-category-menu.css'} enableShadowRoot={true} collapsible={true}/>
    , document.getElementById('container')
  );

  const reactElementSymbol = (<a></a>).$$typeof;
  console.log((<ul></ul>).$$typeof === reactElementSymbol)//typeof (<a></a>)['$$typeof'])
}
