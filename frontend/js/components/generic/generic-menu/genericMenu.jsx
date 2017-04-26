import React from 'react';
import _ from 'lodash';
import ShadowDOM from 'react-shadow';
import classNames from 'classnames';
import GenricList from '../generic-category-menu/genericCategoryMenu.jsx';
import Helpers from '../../../helpers/helpers.jsx';

const TOP = Symbol.for('top');
const BOTTOM = Symbol.for('bottom');
const LEFT = Symbol.for('left');
const RIGHT = Symbol.for('right');

function parseCategories(categories){
  return categories.map((category) => {
    category.content = (<a href="#">{category.name}</a>);
    if(category.subcategories) category.subcategories = parseCategories(category.subcategories);
    return category;
  });
}

export default class GenericMenu extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
      return classNames(this.props.classList, {
        collapsible: this.props.collapsible,
        collapsed: state.collapsed,
        top: (state.position === TOP),
        bottom: (state.position === BOTTOM),
        left: (state.position === LEFT),
        right: (state.position === RIGHT)
      })
      this.state = {}
    }

    this.state = {
      position: (this.props.position === TOP || this.props.position === BOTTOM || this.props.position === LEFT || this.props.position === RIGHT) ? this.props.position : TOP,
      collapsed: false
    };

    this.wrapperObject = {
      element: 'a',
      props: {
        style: {pointerEvents: 'none'},
        href: '#'
      },
    }
  }

  handleOnKeyUp(event) {
    if (this.props.onKeyUp && typeof this.props.onKeyUp === 'function')
      this.props.onKeyUp.call(this, event)
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  render() {
    let categories = parseCategories(this.props.menuItems);
    console.log(categories);
    let componentUI = (
      <menu className={this.state.cssClasses}>
        <nav>
          <GenricList categories={categories} wrapperObject={this.wrapperObject} hoverable={true} collapsible={false} listElementClassList={this.props.listElementClassList} collapseOnChange={false}/>
        </nav>
      </menu>
    );
    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(componentUI, this.props.cssPath);
    return componentUI;
  }
}
