import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/productList.jsx';
import Category from './components/generic/generic-category-menu/genericCategoryMenu.jsx';
import Menu from './components/generic/generic-menu/genericMenu.jsx';
import Helpers from './helpers/helpers.jsx';
import TagsInput from './components/generic/generic-tags-input/genericTagsInput.jsx';
import ImageCropper from './components/generic/generic-image-cropper/genericImageCropper.jsx';
//import Description from './components/generic/generic-description-output/genericDescriptionOutput.jsx';
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
    <Menu classList={['menu']} menuItems={menuItems} keyIterator={initGenerator()} cssPath={'js/components/generic/generic-menu/css/generic-menu.css'}
    listElementClassList={['list-element']} wrapperClassList={''} collapsible={false} position={Symbol.for('top')}/>
    , document.getElementById('menu')
  );
  ReactDOM.render(
    <Description classList={['description']} capped={15} content={'aaaaaa aaaaa aaaaa aaaaa aaaaaaaa aaaaaaaa aaaaaaaa'}/>, document.getElementById('menu')
  );
  ReactDOM.render(
    <TagsInput cssPath='js/components/generic/generic-tags-input/css/generic-tags-input.css' id={'tagsInput'} classList={[]} useFontAwesome={true} fontAwesomePath={'css/font-awesome/css/font-awesome.min.css'} disableTagActivation={true} tagsList={['a','b','c']}/>
    , document.getElementById('container')
  );
  ReactDOM.render(
    <Category categories={categories} keyIterator={initGenerator()} classList={['']}
    listElementClassList={['list-element']} cssPath={'js/components/generic/generic-category-menu/css/generic-category-menu.css'} enableShadowRoot={true} collapsible={true} collapseOnChange={false}/>
    , document.getElementById('list')
  );*/
  ReactDOM.render(
    <ImageCropper classList={[]} src={'/test/img/20160421_143103.jpg'} alt={'test'} />
    ,document.getElementById('container')
  );
}

//20160421_143103.jpg
/*ReactDOM.render(
<ProductList products={data} collapsible={true}/>
  <Menu classList={['menu']} menuItems={menuItems} keyIterator={initGenerator()} cssPath={'js/components/generic/generic-menu/css/generic-menu.css'}
  listElementClassList={['list-element']} wrapperClassList={''} />

  <Category categories={categories} keyIterator={initGenerator()} classList={['']}
  listElementClassList={['list-element']} cssPath={'js/components/generic/generic-category-menu/css/generic-category-menu.css'} enableShadowRoot={true}/>

  */

  /*ReactDOM.render(
    <Category categories={categories} keyIterator={initGenerator()} classList={['']}
    listElementClassList={['list-element']} cssPath={'js/components/generic/generic-category-menu/css/generic-category-menu.css'} enableShadowRoot={true} collapsible={true} collapseOnChange={true}/>
    , document.getElementById('container')
  );*/
