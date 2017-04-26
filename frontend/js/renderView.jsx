'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import ProductList from './components/productList.jsx';
import Category from './components/generic/generic-category-menu/genericCategoryMenu.jsx';
import Menu from './components/generic/generic-menu/genericMenu.jsx';
import Helpers from './helpers/helpers.jsx';
import TagsInput from './components/generic/generic-tags-input/genericTagsInput.jsx';
import ImageCropper from './components/generic/generic-image-cropper/genericImageCropper.jsx';
import AddProductForm from './components/admin/addProductForm.jsx';
//import Description from './components/generic/generic-description-output/genericDescriptionOutput.jsx';
//Upload
import Upload from './components/generic/generic-file-upload/genericFileUpload.jsx';
import Select from './components/generic/generic-select/genericSelect.jsx';
import EnchancedBasicElement from './components/generic/base/EnchancedBasicElement.jsx';

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

let menuItems = ['test', 'more tests', 'some val', 'other val'];

let categories= [
  {
    name: "categoryLevel1",
    id: "categoryLevel1",
    subcategories: [
      {
        name: "subCategoryLevel1_1",
        id: "subCategoryLevel1_1",
      },
      {
        name: "subCategoryLevel1_2",
        id: "subCategoryLevel1_2",
      }
    ]
  },
  {
    name: 'categoryLevel1_1',
    id: 'categoryLevel1_1',
    subcategories: [
      {
        name: 'subCategoryLevel1_1',
        id: 'subCategoryLevel1_1',
        subcategories: [
          {
            name: 'subCategoryLevel1_2',
            id: 'subCategoryLevel1_2',
          }
        ]
      }
    ]
  },
  {
    name: "categoryLevel1_2",
    id: "categoryLevel1_2",
  }
]


//here we implement logic
function initGenerator() {
  return Helpers.createKeyGenerator(0,(key) => {
    return ++key;
  });
}

function filesUploadCallback(files){
  if(!files || files.length > 1) {error: {isError: true}};
  let reader  = new FileReader();
  /*Array.prototype.forEach.call(files,
    (file) =>{ console.log(file);}
  );*/
  reader.onload = function(){
    ReactDOM.render(
      <ImageCropper classList={[]} src={reader.result} alt={'test'} constrain={true} cssPath={'js/components/generic/generic-image-cropper/css/generic-image-cropper.css'} cropCallback={cropCallback}/>
      ,document.getElementById('img')
    );
  };

  try{
    reader.readAsDataURL(files[0]);
  }catch(error){
    console.log('filesUploadCallback', error);
    return {error: {isError: true}};
  }

  return {error: {isError: false}};
}

let instance = Axios.create({
  baseURL: 'http://localhost:3000/product/',
  timeout: 1000
});

function cropCallback(imgData){
  instance.post('/saveproduct', {imgData: Helpers.getBase64FromUrl(imgData)},{
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default function renderView() {
  /*ReactDOM.render(
    <Upload classList={['wrapper']} useAdvanced={true} filesUploadCallback={filesUploadCallback} allowMultipleUploads={false} enableShadowRoot={true} cssPath={'js/components/generic/generic-file-upload/css/generic-file-upload.css'}/>
    ,document.getElementById('container')
  );*/
  ReactDOM.render(
    <AddProductForm id={'form'} enableShadowRoot={true} cssPath={'js/components/admin/css/addProductForm.css'} css={{form: 'formWrapper', formField: 'formField'}}/>
    ,document.getElementById('container')
  );
  /*ReactDOM.render(
    <Select id={'form'} classList={[]} options={menuItems} />
    ,document.getElementById('container')
  );*/
  /*ReactDOM.render(
    <Menu classList={['menu']} menuItems={categoriesNew} keyIterator={initGenerator()} cssPath={'js/components/generic/generic-menu/css/generic-menu.css'}
    enableShadowRoot={true} listElementClassList={['list-element']} wrapperClassList={''} collapsible={false} position={Symbol.for('top')}/>
    , document.getElementById('menu')
  );*/
  /*let css = {
    inputWrapper: 'inputWrapper',
    inputBox: 'inputBox',
    listElement: 'listElement',
    list: 'list',
    selectedBox: 'selectedBox',
    classList: 'wrapper',
    singleSelect: 'singleSelect',
    oneOfSelectedElements: 'oneOfSelectedElements',
    selectedElement: 'selectedElement'
  }
  ReactDOM.render(
    <Select id={'form'} css={css} deleteSelected={false} multipleSelect={false} classList={['wrapper']} options={menuItems} enableShadowRoot={true} cssPath={'js/components/generic/generic-select/css/generic-select.css'}/>
    ,document.getElementById('container')
  );*/
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
  );
  Upload
  ReactDOM.render(
    <ImageCropper classList={[]} src={'/img/1975-free-love.png'} alt={'test'} constrain={true} cssPath={'js/components/generic/generic-image-cropper/css/generic-image-cropper.css'} cropCallback={cropCallback}/>
    ,document.getElementById('img')
  );*/
