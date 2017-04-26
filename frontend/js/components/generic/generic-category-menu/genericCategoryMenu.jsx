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
        {categoryObj.map((elem, idx) => {
          eventkey = `number${idx}root${initKey}level${level}`;
          tmpParentsList = parentsList.slice();
          tmpParentsList.push(eventkey);
          if(elem.subcategories){
            let submenu = this.parseCategories(elem.subcategories, idx, tmpParentsList.slice(), level+1);
            return (<CategoryItem hoverable={this.props.hoverable} eventkey={eventkey} collapsible={this.props.collapsible} key={eventkey} category={elem.content} submenu={submenu} classList={this.props.listElementClassList.concat('submenu')} currentActiveChild={this.state.currentActiveChild}  currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} />);
          }else{
            return (<CategoryItem hoverable={this.props.hoverable} eventkey={eventkey} key={eventkey} category={elem.content} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={this.props.collapseOnChange}/>);
          }
        })}
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
