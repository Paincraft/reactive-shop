import React from 'react';
import _ from 'lodash';
import CategoryItem from './genericCategoryItem.jsx';
import classNames from 'classnames';
import ShadowDOM from 'react-shadow';
import Helpers from '../../../helpers/helpers.jsx';

const reactElementSymbol = (<a></a>).$$typeof;
/*
props{
  keyIterator: Iterator,
  classList: [],
  hoverable: boolean,
  enableShadowRoot: boolean,
  cssPath: ''
}
*/
export default class GenericCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveChild: '',
      cssClasses: classNames(this.props.classList)
    };
  }

  //callback passesd and bound to child (genericCategoryItem)
  onClickCallback(rootCtx) {
    return  (event, childEventKey, parentsList) => {
      rootCtx.setState({currentActiveChild: childEventKey, currentActiveChildParentsList: parentsList});
      console.log('currentActiveChild', childEventKey);
    }
  }

  parseCategories(categoryObj, initKey, parentsList = [], level = 0) {
    let eventkey;
    let tmpParentsList;
    let opts;
    return (
      <ul>
        {Object.keys(categoryObj).map(((key, idx) => {
          eventkey = `number${idx}root${initKey}level${level}`;
          tmpParentsList = parentsList.slice();
          tmpParentsList.push(eventkey);

          /*
            category1:{
              subcategory1: ['subcategory1_1']
            }
          */
          let bottomLevel = Array.isArray(categoryObj);
          if(eventkey === 'number1root0level1') console.log('top', categoryObj);
          if (!bottomLevel && categoryObj[key]){
            //console.log(tmp)
            /*opts = {
              hoverable:this.state.hoverable,
              eventkey: eventkey,
              collapsible: this.props.collapsible,
              category: (categoryObj[key] && Array.isArray(categoryObj[key])) ? key : categoryObj[key],
              submenu: (categoryObj[key] && Array.isArray(categoryObj[key])) ? this.parseCategories(categoryObj[key], initKey+1, tmpParentsList.slice(), true) : null,
              classList: this.props.listElementClassList,
              currentActiveChild: this.state.currentActiveChild,
              onClick: this.onClickCallback(this),
              parentsList: tmpParentsList.slice(),
              currentActiveChildParentsList: this.state.currentActiveChildParentsList,
              collapseOnChange: this.props.collapseOnChange
            }*/

            return (
              <CategoryItem hoverable={this.props.hoverable} eventkey={eventkey} collapsible={this.props.collapsible} key={eventkey} category={key} submenu={this.parseCategories(categoryObj[key], idx, tmpParentsList.slice(), level+1)} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange} />
            )
          } else {
            return (
              <CategoryItem hoverable={this.props.hoverable} eventkey={eventkey} key={eventkey} category={categoryObj[key]} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange}/>
            )
          }
        }).bind(this))}
      </ul>
    )
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cssClasses)
      this.setState({cssClasses: nextProps.classList});
  }

  render() {
    let result = this.parseCategories(this.props.categories, 0);
    if(this.props.wrapped){
      result = (
          <div className={this.state.cssClasses} id={this.props.id}>
            {result}
          </div>
    )}
    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(result, this.props.cssPath);
    return result;
  }
}
