import React from 'react';
import _ from 'lodash';
import CategoryItem from '../base/EnchancedLi.jsx';
import classNames from 'classnames';
import ShadowDOM from 'react-shadow';

const reactElementSymbol = (<a></a>).$$typeof;

export default class GenericCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveChild: '',
      hoverable: this.props.hoverable,
      cssClasses: classNames(this.props.classList)
    };
  }

  //callback passesd and bound to child (genericCategoryItem)
  onClickCallback(rootCtx) {
    return  (event, childEventKey, parentsList) => {
      rootCtx.setState({currentActiveChild: childEventKey, currentActiveChildParentsList: parentsList});
    }
  }

  parseCategories(categoryObj, initKey, parentsList = [], deep) {
    let eventkey;
    let tmpParentsList;
    let opts;
    return (
      <ul>
        {Object.keys(categoryObj).map(((key, idx) => {
          eventkey = `eventkey${initKey}${idx}`;
          tmpParentsList = parentsList.slice();
          tmpParentsList.push(eventkey);
          if (categoryObj[key] && (Array.isArray(categoryObj[key]) || (typeof categoryObj[key] === 'object' && categoryObj[key].$$typeof !== reactElementSymbol))) {
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
              <CategoryItem hoverable={this.state.hoverable} eventkey={eventkey} collapsible={this.props.collapsible} key={`${initKey}${idx}`} category={key} submenu={this.parseCategories(categoryObj[key], initKey+1, tmpParentsList.slice(), true)} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange}/>
            )
          } else {
            return (
              <CategoryItem hoverable={this.state.hoverable} eventkey={eventkey} key={`${initKey}${idx}`} category={categoryObj[key]} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange}/>
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
    if(this.props.enableShadowRoot){
      result = (<ShadowDOM include={[this.props.cssPath]}><div>{result}</div></ShadowDOM>)
    }
    return result;
  }
}
