import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import EnchancedBasicElement from '../base/EnchancedBasicElement.jsx';
import Helpers from '../../../helpers/helpers.jsx';
import {generateSvgDefinitions, getIconGenerator} from '../../../helpers/iconMoonParser.jsx';
/*
props{
  keyIterator: Iterator,
  tagsList: [],
  classList: [],
  enableShadowRoot: boolean,
  cssPath: ''
}
*/
const reactElementSymbol = (<a></a>).$$typeof;
const SEPARATOR_KEY = 32;
const SEPARATOR = ' ';
const BACKSPACE_KEY = 0;
const DELETE_KEY = 46;
const ENTER_KEY = 13;

function prepareTagObjects(list, keyIterator){
  return list.map((elem, idx) => {
    return {tag: elem, eventkey: `eventkey${keyIterator.next().value}`}
  })
}

export default class GenericTagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.iconClose = getIconGenerator('cancel-circle');
    this.keyIterator = this.props.keyIterator || Helpers.createDefaultKeyGenerator();
    this.state = {
      tags: Array.isArray(this.props.tagsList) ? prepareTagObjects(this.props.tagsList, this.keyIterator) : [],
      cssClasses: classNames(this.props.css.wrapper) //tags-input
    };
  }

  stripValues(tagObjList){
     return tagObjList.map((tagObj) => {
      return tagObj.tag;
    });
  }

  handleOnKeyDown(event){
    if(this.props.output) return;
    //console.log(this.wrapper);
    let input = this.wrapper.getElementsByTagName('input')[0] || null;
    let key = event.keyCode || event.which;
    let tags = input.value.split(SEPARATOR);

    //console.log(key)
    //console.log(input.selectionStart, input.selectionEnd, input.selectionStart === input.selectionEnd && input.selectionStart);

    if (key === SEPARATOR_KEY || key === ENTER_KEY) {
			if (!tags) return;
      this.addTag(tags, input);
			//savePartialInput(input.value, wrapper, input);
		}

    if (key === DELETE_KEY || key === BACKSPACE_KEY) {
      this.deleteSelectedTags(this.wrapper);
			//savePartialInput(input.value, wrapper, input);
		}
  }

  addTag(values, input){
    if(this.props.output) return;
    let newTags = this.state.tags.slice();
    let update = false;
    if(Array.isArray(values)){
      values.forEach((value) => {
        let tag = value && value.trim();
        if (tag){
          tag = tag.toLowerCase();
          let duplicate = this.state.tags.find((elem) => { return elem.tag.toLowerCase() === tag});
          if(duplicate){
            let duplicatedElement = this.wrapper.querySelectorAll(`span.tag[data-eventkey='${duplicate.eventkey}']`)[0] || null;
            duplicatedElement.classList.add('duplicate');
            setTimeout(()=>{
              duplicatedElement.classList.remove('duplicate');
            }, 1000);
            input.value = '';
          }else{
            update = true;
            newTags.push({tag: tag, eventkey: `eventkey${this.keyIterator.next().value}`});
          }
        }
      })
      if(update){
        this.setState({tags: newTags});
        input.value = '';
        if (this.props.onChange && typeof this.props.onChange === 'function'){
          //console.log(this.stripTags(newTags));
          this.props.onChange(this.stripValues(newTags));
        }
      }
    }
  }

  handleDelete(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.props.output) return;
    let eventkey = event.target.attributes.getNamedItem('data-eventkey');
    this.deleteTag(eventkey);
  }

  deleteTag(eventkey){
    let tagIndex = this.state.tags.findIndex((tag) => {
      return tag.eventkey === eventkey.value;
    });
    if (tagIndex < 0) return false;
    let newTags = this.state.tags.slice();
    newTags.splice(tagIndex, 1);
    this.setState({tags: newTags});
    if (this.props.onChange && typeof this.props.onChange === 'function')
      this.props.onChange(this.stripValues(newTags));
  }

  deleteSelectedTags(wrapper){
    let selectedTags = Array.prototype.slice.call(wrapper.getElementsByClassName('active'));
    //console.log(selectedTags)
    selectedTags.forEach((tag) => {
      tag.remove();
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cssClasses)
      this.setState({cssClasses: nextProps.classList});
  }

  componentWillUpdate(props,state){
      //console.log('update', state.tags);
  }

  render() {
    let wrapContent = (content,idx) => {
      return (<span data-eventkey={content.eventkey}>{[content.tag, <span className={classNames(this.props.css.deleteTagWrapper)}>{this.iconClose({className: classNames(this.props.css.deleteTag), onClick: this.handleDelete.bind(this), "data-eventkey": content.eventkey})}</span>]}</span>)
    }
    let componentUI =  (
      <div ref={(wrapper) => {this.wrapper = wrapper}} onKeyDown={this.handleOnKeyDown.bind(this)}  tabIndex={'1'} className={this.state.cssClasses} id={this.props.id}>
        {(() => {
          if(!this.props.output){
            return (<input className={classNames(this.props.css.input)} onKeyDown={this.handleOnKeyDown.bind(this)} type='text'/>);
          }
        })()}
        {this.state.tags.map((value, idx) => {
          let content = value.tag;
          if(!this.props.output){
            content = wrapContent(value,idx);
          }
          return (<EnchancedBasicElement element={"span"} clickable={!this.props.disableTagActivation || !this.props.output} classList={this.props.css.tag} key={idx} eventkey={value.eventkey} content={content} />);
        })}
      </div>
    )
    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    return componentUI;
  }
}
