import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../../helpers/helpers.jsx';
import EnchancedBasicElement from '../base/EnchancedBasicElement.jsx';
import {generateSvgDefinitions, addIconSupport, getIconGenerator} from '../../../helpers/iconMoonParser.jsx';

export default class GenericSelect extends React.Component {
  constructor(props) {
    super(props);
    this.iconUp = getIconGenerator('arrow-up');
    this.iconDown = getIconGenerator('arrow-down');
    this.iconClose = getIconGenerator('cancel-circle');

    this.options = this.props.options.map((elem, idx) => {return {name: elem.name || elem, value: elem.value || elem, key: idx, selected: false}}) || [];
    this.state = {
      cssClasses: classNames(this.props.css.wrapper),
      selectedElements: this.props.selectedElements || [],
      options: this.options || [],
      listIsActive: false
    };
  }

  handleOnKeyUp(event){
    event.preventDefault();
    event.stopPropagation();
    let value = this.filter.value;
    this.setState({
      listIsActive: true,
      options: this.options.filter((option) => {
        return option.value.includes(value);
      })
    })
  }

  activateList(event){
    event.preventDefault();
    event.stopPropagation();
    if(!this.state.listIsActive){
      this.setState({
        listIsActive: true,
      });
    }
  }

  deactivateList(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.state.listIsActive){
      this.setState({
        listIsActive: false,
      });
    }
  }

  deleteSelectedElement(event){
    let key = event.target.getAttribute('data-eventkey');
    if(key){
      let selectedElements = this.state.selectedElements.filter((elem) => {
        console.log(elem.key, key);
        return String(elem.key) !== String(key);
      });
      this.setState({
        selectedElements: selectedElements,
        listIsActive: false
      })
      if (this.props.onChange && typeof this.props.onChange === 'function')
        this.props.onChange(selectedElements);
    }
  }

  clearSelected(){
    this.setState({
      selectedElements: [],
      listIsActive: false
    })
  }

  addElement(event, eventkey){
    let options = this.state.options.slice();
    let selectedElements = this.state.selectedElements.slice();

    let selected = options.find((elem, idx) => {
      return elem.key === eventkey;
    })

    if(this.props.deleteSelected === true){
      options = options.filter((elem) => {
        return !(selectedElements.includes(elem) || (selected && elem.key === selected.key))
      });
    }

    if(selected){
      //allow same && multipleSelect
      if((this.props.multipleSelect === true && (!selectedElements.includes(selected) || (this.props.allowSameElements === true)))|| (!this.props.multipleSelect && selectedElements.length < 1)){
        selectedElements.push(selected);
        if (this.props.onChange && typeof this.props.onChange === 'function')
          this.props.onChange(selectedElements);
      }
      this.setState({
        options: options,
        selectedElements: selectedElements,
        listIsActive: false
      })
    }
  }

  render(){
    let addMultiselectBox = () => {
      let result;
      if(this.props.multipleSelect === true){
        result = (
          <div className={classNames(this.props.css.selectedBox)}>
            {this.state.selectedElements.map((element) => {
              return (
                <div className={classNames(this.props.css.oneOfSelectedElements)}>
                  {element.value}
                  {this.iconClose({className: {show: true}, onClick: this.deleteSelectedElement.bind(this), "data-eventkey": element.key})}
                </div>
              );
            })}
          </div>
        );
      }
      return result;
    }

    let showSingleSelected =  (!this.props.multipleSelect && this.state.selectedElements.length === 1);
    let hideSingleSelected = (this.props.multipleSelect === true || (!this.props.multipleSelect && this.state.selectedElements.length < 1));
    let componentUI = (
      <div className={this.state.cssClasses}>
        <div className={classNames(this.props.css.inputWrapper)}>
          <div ref={(node) => {this.singleSelected = node}} className={classNames(this.props.css.singleSelect, {show: showSingleSelected, hide: hideSingleSelected})}>
            {this.state.selectedElements.map((element) => {
              return (<span className={classNames(this.props.css.selectedElement)}>{element.value}</span>);
            })}
          </div>
          <div tabIndex={'1'} onFocus={this.activateList.bind(this)} onBlur={this.deactivateList.bind(this)} className={classNames(this.props.css.inputBox)}>
            <input ref={(node) => {this.filter = node}} onKeyUp={this.handleOnKeyUp.bind(this)} type={"text"} />
            {this.iconUp({className: {show: this.state.listIsActive && hideSingleSelected, hide: !this.state.listIsActive || showSingleSelected}, onClick: this.deactivateList.bind(this)})}

            {this.iconDown({className: {show: !this.state.listIsActive && hideSingleSelected, hide: this.state.listIsActive || showSingleSelected}, onClick: this.activateList.bind(this)})}

            {this.iconClose({className: {show: showSingleSelected, hide: hideSingleSelected}, onClick: this.clearSelected.bind(this)})}
            <ul className={classNames(this.props.css.list, {active: this.state.listIsActive})}>
              {this.state.options.map((option) => {
                let content = (<span>{option.value}</span>);
                return (<EnchancedBasicElement hoverable={true} key={option.key} classList={this.props.css.listElement} eventkey={option.key} element={'li'} clickable={false} onClick={this.addElement.bind(this)} content={content} />);
              })}
            </ul>
          </div>
        </div>
        {addMultiselectBox() }
      </div>
    );

    if(this.props.enableShadowRoot){
      componentUI = addIconSupport(componentUI);
      return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    }

    return componentUI;
  }
}
