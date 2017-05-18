import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../helpers/helpers.jsx';
import ImageUpload from '../generic/generic-file-upload/genericFileUpload.jsx';
import Tags from '../generic/generic-tags-input/genericTagsInput.jsx';
import Select from '../generic/generic-select/genericSelect.jsx';
import ImageCropper from '../generic/generic-image-cropper/genericImageCropper.jsx';
import {generateSvgDefinitions, addIconSupport} from '../../helpers/iconMoonParser.jsx';

//refactor to redux async actions --> this is just a POC
import Axios from 'axios';




const fileUploadCss = {
  wrapper: ['fileUploadWrapper', 'formWrapper'],
  form: 'fileUploadForm',
  inputBox: ['fileUploadInputBox'],
  input: ['fileUploadInput', 'fileUploadInputStyle', 'fileUploadBoxFile'],
  inputLabel: 'fileUploadDragAndDrop',
  error: 'fileUploadError',
  success: 'fileUploadSuccess',
  uploading: 'fileUploadUploading',
  submit: 'fileUploadButton'
}

const selectCss = {
  inputWrapper: 'selectInputWrapper',
  inputBox: 'selectInputBox',
  listElement: 'selectListElement',
  list: 'selectList',
  selectedBox: 'selectSelectedBox',
  wrapper: 'selectWrapper',
  singleSelect: 'selectSingleSelect',
  oneOfSelectedElements: 'selectOneOfSelectedElements',
  selectedElement: 'selectSelectedElement'
}

const tagsCss = {
  deleteTag: 'deleteIcon',
  wrapper: 'tags-input',
  input: '',
  deleteTagWrapper: 'deleteIconWrapper',
  tag: 'tag'
}

const selectOptionsMock = ['test1', 'test2', 'test3']
const svgDefinitions = generateSvgDefinitions();

export default class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cssClasses: classNames(this.props.css.form),
      cropperOpened: false,
      fileUploadLabel: null,
      product: {}
    };
    this.fileUploadBackground = '#c8dadf';
    //this.fileUploadLabel;
    this.selectedFile = '';
    this.instance = Axios.create({
      baseURL: 'http://localhost:3000/api/product/',
      timeout: 1000
    });
  }

  cropCallback(imgData){
    this.fileUploadBackground = `url('${imgData}')`;
    this.fileUploadLabel = 'test';
    let product = this.state.product;
    product.imgData = imgData;
    this.setState({
      cropperOpened: false,
      fileUploadLabel: '',
      product: product
    });
    /*instance.post('/saveproduct', {imgData: Helpers.getBase64FromUrl(imgData)},{
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
  }

  filesUploadCallback(files){
    if(!files || files.length > 1) return {error: {isError: true}};
    let reader = new FileReader();
    let rootCtx = this;
    reader.onload = function(){
      rootCtx.selectedFile = reader.result;
      rootCtx.setState({cropperOpened: true})
    };

    try{
      reader.readAsDataURL(files[0]);
    }catch(error){
      console.log('filesUploadCallback', error);
      return {error: {isError: true}};
    }

    return {error: {isError: false}};
  }

  /*Temporary until redux is implemented*/
  setName(){
    //console.log('setting name', name)
    let product = this.state.product;
    product.name = this.nameInput.value;
    this.setState({
      product: product
    });
  }

  setDescription(){
    let product = this.state.product;
    product.description = this.descriptionInput.value;
    this.setState({
      product: product
    });
  }

  setCategories(category){
    let product = this.state.product;
    product.category = category;
    this.setState({
      product: product
    });
  }

  setTags(tags){
    console.log('tags change', tags);
    let product = this.state.product;
    product.tags = tags;
    this.setState({
      product: product
    });
  }

  saveProduct(){
    this.instance.post('/saveproduct', this.state.product, {
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

  render(){
    let displayCropper = function(){
      let cropperUI = (<ImageCropper ref={(node) => {this.cropper = node}} classList={[]} src={this.selectedFile} alt={'test'} constrain={true} enableShadowRoot={true} cssPath={'js/components/generic/generic-image-cropper/css/generic-image-cropper.css'} cropCallback={this.cropCallback.bind(this)} />)

      if(this.state.cropperOpened){
        return cropperUI;
      }

      return;
    }

    let componentUI = (
      <form id={this.props.id} className={this.state.cssClasses}>
        {displayCropper.bind(this)()}
        <div className={classNames(this.props.css.formField)}>
          <ImageUpload label={this.state.fileUploadLabel} acceptedFilesTypes={'image'} enableShadowRoot={true} cssPath={'js/components/admin/css/fileUpload.css'} useAdvanced={true} css={fileUploadCss} acceptedFilesTypes={['image']} allowMultipleUploads={false} background={this.fileUploadBackground} filesUploadCallback={this.filesUploadCallback.bind(this)}/>
        </div>
        <div className={classNames(this.props.css.formField)}>
          <label className={classNames(this.props.css.label)} form={this.props.id} htmlFor={'productName'}>name</label>
          <input ref={(nameInput) => this.nameInput = nameInput} onChange={this.setName.bind(this)} id={'productName'} type={"text"} />
        </div>
        <div className={classNames(this.props.css.formField)}>
          <label className={classNames(this.props.css.label)} form={this.props.id} htmlFor={'categories'}>description</label>
          <textarea ref={(descriptionInput) => this.descriptionInput = descriptionInput} onChange={this.setDescription.bind(this)} id={'productDescription'}></textarea>
        </div>
        <div className={classNames(this.props.css.formField)}>
          <label className={classNames(this.props.css.label)} form={this.props.id} htmlFor={'categories'}>categories</label>
          <Select onChange={this.setCategories.bind(this)} enableShadowRoot={false} options={selectOptionsMock} multipleSelect={false} id={'categories'} css={selectCss}/>
        </div>
        <div className={classNames(this.props.css.formField)}>
          <label className={classNames(this.props.css.label)} form={this.props.id} htmlFor={'tags'}>tags</label>
          <Tags onChange={this.setTags.bind(this)} id={'tags'} css={tagsCss} />
        </div>
        <button type={'button'} style={{'background-color':'red'}} onClick={this.saveProduct.bind(this)}>save</button>
      </form>
    );

    if(this.props.enableShadowRoot){
      componentUI = addIconSupport(componentUI);
      return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    }

    return componentUI;
  }
}
