import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../../helpers/helpers.jsx';
import ShadowDOM from 'react-shadow';

//based on http://tympanus.net/codrops/2014/10/30/resizing-cropping-images-canvas/
export default class GenericImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cssClasses: classNames('main-overlay', this.props.classList)
    };
    this.origSrc = new Image();
    this.origSrc.src = this.props.src;
    this.eventState = {};
    this.constrain = this.props.constrain;
    this.minHeight = this.minWidth = 60;
    this.maxHeight = this.maxWidth = 1920;
    this.resizeCanvas = document.createElement('canvas');
    this.resizingBinded = this.resizing.bind(this);
    this.endResizeBinded = this.endResize.bind(this);
    this.movingBinded = this.moving.bind(this);
    this.endMovingBinded = this.endMoving.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cssClasses)
      this.setState({cssClasses: classNames('main-overlay', this.props.classList)});
  }

  componentDidMount(){
    //Initial resize, prevent cropping errors on unchanged img
    this.image.style = 'visibility:hidden;';
    setTimeout(() => {
      window.requestAnimationFrame((() => {
        this.resizeImage(this.image.width-1, this.image.height-1);
        this.image.style = '';
      }).bind(this))
    },0);
  }

  handleOnMouseDownResize(event){
    event.preventDefault();
    event.stopPropagation();
    this.saveEventState(event);
    document.addEventListener('mousemove', this.resizingBinded, true);
    document.addEventListener('mouseup', this.endResizeBinded, true);
    document.documentElement.addEventListener('mouseout', this.endResizeBinded, true);
  }

  handleOnMouseDownMove(event){
    event.preventDefault();
    event.stopPropagation();
    this.saveEventState(event);
    document.addEventListener('mousemove', this.movingBinded, true);
    document.addEventListener('mouseup', this.endMovingBinded, true);
  }

  saveEventState(event){
    let wrapperOffset = Helpers.getDomElementOffset(this.wrapper);
    this.eventState.containerWidth = this.wrapper.offsetWidth;
    this.eventState.containerHeight = this.wrapper.offsetHeight;
    this.eventState.containerLeft = wrapperOffset.left;
    this.eventState.containerTop = wrapperOffset.top;
    this.eventState.mouseX = (event.clientX || event.pageX || event.originalEvent.touches[0].clientX) + window.pageXOffset;
    this.eventState.mouseY = (event.clientY || event.pageY || event.originalEvent.touches[0].clientY) + window.pageYOffset;

    // This is a fix for mobile safari
    // For some reason it does not allow a direct copy of the touches property
    /*if(typeof e.originalEvent.touches !== 'undefined'){
  	eventState.touches = [];
  	$.each(e.originalEvent.touches, function(i, ob){
  	  eventState.touches[i] = {};
  	  eventState.touches[i].clientX = 0+ob.clientX;
  	  eventState.touches[i].clientY = 0+ob.clientY;
  	});
  }*/
    this.eventState.event = event;
    event.persist();
  }

  endMoving(event){
    event.preventDefault();
    document.removeEventListener('mouseup', this.endMovingBinded, true);
    document.removeEventListener('mousemove', this.movingBinded, true);
  };

  endResize(event){
    event && event.preventDefault();
    if(event && (event.target === document.documentElement && event.type === 'mouseout') || event.type === 'mouseup'){
      document.removeEventListener('mousemove', this.resizingBinded, true);
      document.removeEventListener('mouseup', this.endResizeBinded, true);
      document.documentElement.removeEventListener('mouseout', this.endResizeBinded, true);
    }
  };

  moving(event){
    let mouse={};
    event.preventDefault();
    event.stopPropagation();
    mouse.x = (event.clientX || event.pageX) + window.pageXOffset;
    mouse.y = (event.clientY || event.pageY) + window.pageYOffset;
    Helpers.setDomElementOffset(this.wrapper, {
        'left': mouse.x - ( this.eventState.mouseX -  this.eventState.containerLeft ),
        'top': mouse.y - (  this.eventState.mouseY -  this.eventState.containerTop )
    });
  };

  resizing(event){
    let mouse={};
    let width,height,left,top;
    let wrapperOffset = Helpers.getDomElementOffset(this.wrapper);
    let winndowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    let winndowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    mouse.x = (event.clientX || event.pageX || event.originalEvent.touches[0].clientX) + window.pageXOffset;
    mouse.y = (event.clientY || event.pageY || event.originalEvent.touches[0].clientY) + window.pageYOffset;

    if(this.eventState.event.target.classList.contains('resize-handle-se')){
      width = mouse.x - this.eventState.containerLeft;
      height = mouse.y  - this.eventState.containerTop;
      left = this.eventState.containerLeft;
      top = this.eventState.containerTop;
    }else if(this.eventState.event.target.classList.contains('resize-handle-sw') ){
      width = this.eventState.containerWidth - (mouse.x -this.eventState.containerLeft);
      height = mouse.y  - this.eventState.containerTop;
      left = mouse.x;
      top = this.eventState.containerTop;
    }else if(this.eventState.event.target.classList.contains('resize-handle-nw') ){
      width = this.eventState.containerWidth - (mouse.x -this.eventState.containerLeft);
      height = this.eventState.containerHeight - (mouse.y -this.eventState.containerTop);
      left = mouse.x;
      top = mouse.y;
      if(this.constrain || event.shiftKey){
        top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
      }
    }else if(this.eventState.event.target.classList.contains('resize-handle-ne') ){
      width = mouse.x -this.eventState.containerLeft;
      height =this.eventState.containerHeight - (mouse.y -this.eventState.containerTop);
      left =this.eventState.containerLeft;
      top = mouse.y;
      if(this.constrain || event.shiftKey){
        top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
      }
    }

    if(this.constrain || event.shiftKey){
        height = width / this.origSrc.width * this.origSrc.height;
    }

    //
    if(width > this.minWidth && height > this.minHeight && width < this.maxWidth && height < this.maxHeight){
      this.resizeImage(width, height);
      Helpers.setDomElementOffset(this.wrapper, {'left': left, 'top': top});
    }
  }

  resizeImage(width, height){
    //console.log('resize')
    this.resizeCanvas.width = width;
    this.resizeCanvas.height = height;
    this.resizeCanvas.getContext('2d').drawImage(this.origSrc, 0, 0, width, height);
    this.image.setAttribute('src', this.resizeCanvas.toDataURL("image/png"));
  };

  crop(){
    let cropCanvas;
    let overlayOffset = Helpers.getDomElementOffset(this.overlay);
    let wrapperOffset = Helpers.getDomElementOffset(this.wrapper);
    let left = overlayOffset.left - wrapperOffset.left;
    let top =  overlayOffset.top - wrapperOffset.top;
    let width = this.overlay.offsetWidth
    let height = this.overlay.offsetHeight;

    cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    cropCanvas.getContext('2d').drawImage(this.image, left, top, width, height, 0, 0, width, height);
    //window.open(cropCanvas.toDataURL("image/png"));
    if(this.props.cropCallback && typeof this.props.cropCallback === 'function')
      this.props.cropCallback(cropCanvas.toDataURL());
  }

  render() {
    return (
      <ShadowDOM include={[this.props.cssPath]}>
        <div>
          <div className={this.state.cssClasses}>
            <div ref={(overlay) => {this.overlay = overlay}} className="overlay">
              <div className="overlay-inner"></div>
            </div>

            <div ref={(wrapper) => {this.wrapper = wrapper}} className={'resize-container'} onMouseDown={this.handleOnMouseDownMove.bind(this)}>
              <span className="resize-handle resize-handle-nw" onMouseDown={this.handleOnMouseDownResize.bind(this)}></span>
              <span className="resize-handle resize-handle-ne" onMouseDown={this.handleOnMouseDownResize.bind(this)}></span>
              <img className="resize-image" ref={(image) => {this.image = image}} src={this.props.src} alt={this.props.alt}/>
              <span className="resize-handle resize-handle-se" onMouseDown={this.handleOnMouseDownResize.bind(this)}></span>
              <span className="resize-handle resize-handle-sw" onMouseDown={this.handleOnMouseDownResize.bind(this)}></span>
            </div>

            <button onClick={this.crop.bind(this)} className="btn-crop js-crop">Crop</button>
          </div>
        </div>
      </ShadowDOM>
    );
  }
}
