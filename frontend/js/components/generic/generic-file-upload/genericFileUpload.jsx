import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../../helpers/helpers.jsx';

//based on https://css-tricks.com/drag-and-drop-file-uploading/

/*props{
  acceptedFilesTypes: [],
  acceptedFilesExtensions: [],
  classList: [],
  useAdvanced: boolean,
  enableShadowRoot: boolean,
  cssPath: ''
}
*/

export default class GenericFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.useAdvanced = (this.props.useAdvanced && Helpers.browserSupportsAdvancedUpload());
    this.acceptedFilesTypes = (Array.isArray(this.props.acceptedFilesTypes) && this.props.acceptedFilesTypes.length > 0) ? this.acceptedFilesTypes : ['*'];
    this.acceptedFilesExtensions = (Array.isArray(this.props.acceptedFilesExtensions) && this.props.acceptedFilesExtensions.length > 0) ? this.acceptedFilesExtensions : ['*'];
    this.state = {
      cssClasses: classNames(this.props.classList),
      formCssClasses: classNames('box', {'has-advanced-upload': this.useAdvanced}),
      uploading: false,
      error: {isError: false, errorMessage: ''},
      droppedFiles: []
    };
  }

  handleDrag(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.state.uploading) return false;

    let newState = {error: {isError: false, errorMessage: ''}};
    if(event.type === 'dragover ' || event.type === 'dragover' ){
      newState.formCssClasses = classNames('box', 'is-dragover', {'has-advanced-upload': this.useAdvanced, 'is-error': this.state.error.isError});
    }else if(event.type === 'dragleave' || event.type === 'dragend'  || event.type === 'drop' || event.type === 'change'){
      //cssClasses: classNames(this.props.classList),
      newState.formCssClasses = classNames('box', {'has-advanced-upload': this.useAdvanced, 'is-error': this.state.error.isError})
      let toUpload = (event.type === 'drop' || event.type === 'change');
      if(toUpload){
        newState.droppedFiles = this.state.droppedFiles.splice();
        Array.prototype.forEach.call(event.dataTransfer.files, (file) => {
          let isAlreadyAdded = this.state.droppedFiles.find((addedFile) => {
            return (addedFile.name === file.name && addedFile.size === file.size);
          })

          if(!isAlreadyAdded){
            let extensionPass = this.acceptedFilesExtensions.includes('*');
            let typePass = this.acceptedFilesTypes.includes('*');
            if(!typePass){
              this.acceptedFilesTypes.forEach((type) => {
                if(file.type && file.type.includes(type)){
                  typePass = true;
                  return false;
                }
              })
            }
            if(!extensionPass){
              this.acceptedFilesExtensions.forEach((extension) => {
                let lastDot = file.name && file.name.lastIndexOf('.');
                let fileExtension = lastDot && file.name.substring(lastDot+1)
                if(fileExtension === extension){
                  typePass = true;
                  return false;
                }
              })
            }
            if(extensionPass && typePass && (this.props.allowMultipleUploads || newState.droppedFiles.length <=1)){
              newState.droppedFiles.push(file);
              newState.uploading = true;
              newState.error = {
                isError: false,
                errorMessage: ''
              };
            }else{
              newState.uploading = false;
              newState.error = {
                isError: true,
                errorMessage: (extensionPass && typePass) ? "You cannot add more than one file" : "Incorrect file type"
              };
            }
          }else{
            newState.uploading = false;
            newState.error = {
              isError: true,
              errorMessage: "File already uploaded"
            };
          }
        })
      }
    }

    this.setState(newState);
    this.handleSubmit(newState);
  }

  handleSubmit(state){
    state.formCssClasses = classNames('box', {'has-advanced-upload': this.useAdvanced, 'is-uploading': state.uploading, 'is-error': state.error.isError})

    if(!state.uploading || state.error.isError){
      state.uploading = false;
      this.setState(state);
      return false;
    }


    let result;
    if(this.props.filesUploadCallback && typeof this.props.filesUploadCallback === 'function'){
      result = this.props.filesUploadCallback(state.droppedFiles);
    }
    console.log(state, result)
    if(!result || (result.error && result.error.isError)){
      this.setState({
        uploading: false,
        formCssClasses: classNames('box', 'is-error', {'has-advanced-upload': this.useAdvanced})
      });
    }else{
      if(!this.props.allowMultipleUploads || (result.clearState && this.props.allowMultipleUploads)){
        this.setState({
          uploading: false,
          droppedFiles: [],
          formCssClasses: classNames('box', 'is-success', {'has-advanced-upload': this.useAdvanced})
        });
      }else{
        this.setState({
          uploading: false,
          formCssClasses: classNames('box', 'is-success', {'has-advanced-upload': this.useAdvanced})
        });
      }
    }
  }

  render() {
    let renderFiles = function(){
      let result;
      if(this.props.allowMultipleUploads){
        result = this.state.droppedFiles.map((file, idx) => {
          return (<span key={idx}>{file.name}</span>);
        });
      }
      return result;
    }

    let componentUI = (
      <div ref={(wrapper) => {this.wrapper = wrapper;}} className={this.state.cssClasses}>
        {renderFiles.bind(this)()}
        <form ref={(form) => {this.form = form;}} onDrag={this.handleDrag.bind(this)} onDragEnd={this.handleDrag.bind(this)} onDragEnter={this.handleDrag.bind(this)} onDragExit={this.handleDrag.bind(this)}
      onDragLeave={this.handleDrag.bind(this)} onDragOver={this.handleDrag.bind(this)} onDragStart={this.handleDrag.bind(this)} onDrop={this.handleDrag.bind(this)} className={this.state.formCssClasses}>
          <div className="js box__input">
            <input onChange={this.handleDrag.bind(this)} className="inputfile inputfile-1 box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
            <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
            <button className="box__button" type="submit">Upload</button>
          </div>
          <div className="box__uploading">Uploading&hellip;</div>
          <div className="box__success">Done!</div>
          <div className="box__error">Error! <span>{this.state.error.errorMessage}</span>.</div>
        </form>
      </div>
    )

    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    return componentUI;
  }
}
