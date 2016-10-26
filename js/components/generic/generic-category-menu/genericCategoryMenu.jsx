import React from 'react';
import _ from 'lodash';
import template from './templates/genericCategoryMenuTemplate.jsx';
import CategoryItem from './genericCategoryItem.jsx';
import classNames from 'classnames';

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
    return (
      <ul>
        {Object.keys(categoryObj).map(((key, idx) => {
          eventkey = `eventkey${initKey}${idx}`;
          tmpParentsList = parentsList.slice();
          tmpParentsList.push(eventkey)
          if (categoryObj[key] && (Array.isArray(categoryObj[key]) || typeof categoryObj[key] === 'object')) {
            //console.log(tmp)
            return (
              <CategoryItem hoverable={this.state.hoverable} eventkey={eventkey} collapsible={this.props.collapsible} key={`${initKey}${idx}`} category={key} submenu={this.parseCategories(categoryObj[key], initKey+1, tmpParentsList.slice(), true)} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={false}/>
            )
          } else {
            return (
              <CategoryItem hoverable={this.state.hoverable} eventkey={eventkey} key={`${initKey}${idx}`} category={key} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild} onClick={this.onClickCallback(this)} parentsList={tmpParentsList.slice()} currentActiveChildParentsList={this.state.currentActiveChildParentsList} collapseOnChange={false}/>
            )
          }
        }).bind(this))}
      </ul>
    )
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cssClasses)
      this.setState({cssClasses: nextProps.cssClasses});
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
