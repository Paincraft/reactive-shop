import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../helpers/helpers.jsx';
import ImageUpload from '../generic/generic-file-upload/genericFileUpload.jsx';
import Tags from '../generic/generic-tags-input/genericTagsInput.jsx';

export default class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cssClasses: classNames(this.props.classList)
    };
  }

  render(){
    let componentUI = (
      <form id={this.props.id} className={this.state.cssClasses}>
        <div>
          <label form={this.props.id} htmlFor={'productName'}>Product name:</label>
          <input id={'productName'}/>
        </div>
        <div>
          <label form={this.props.id} htmlFor={'productDescription'}>Product description:</label>
          <textarea id={'productDescription'}></textarea>
        </div>
        <div>
          <ImageUpload classList={['wrapper']} enableShadowRoot={true} useAdvanced={true} cssPath={'js/components/admin/css/addProductFileUpload.css'} allowMultipleUploads={false} />
        </div>
        <div>
          <label form={this.props.id} htmlFor={'categories'}>Product categories:</label>
          <Tags cssPath='js/components/generic/generic-tags-input/css/generic-tags-input.css' id={'categories'} classList={[]} useFontAwesome={false}/>
        </div>
        <div>
          <label form={this.props.id} htmlFor={'tags'}>Product tags:</label>
          <Tags cssPath='js/components/generic/generic-tags-input/css/generic-tags-input.css' id={'tags'} classList={[]} useFontAwesome={false}/>
        </div>
      </form>
    );

    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    return componentUI;
  }
}
