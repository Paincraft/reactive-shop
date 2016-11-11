import React from 'react';
import GenericItem from '../../generic-category-menu/GenericCategoryItem.jsx';
import GenricList from '../../generic-category-menu/GenericCategoryMenu.jsx';
import ShadowDOM from 'react-shadow';

function wrapCategory(category){
  return (<a href='#' style={{pointerEvents: 'none'}}>{category}</a>)
}

export default function() {
  let wrappedMenuItems = this.props.menuItems.map((Item) => {
    return wrapCategory(Item);
  })

  return (
    <ShadowDOM include={[this.props.cssPath]}>
      <div>
        <menu className={this.state.cssClasses}>
          <nav>
            <GenricList categories={wrappedMenuItems} hoverable={true} collapsible={false} listElementClassList={this.props.listElementClassList} collapseOnChange={false}/>
          </nav>
        </menu>
      </div>
    </ShadowDOM>
  )
}

/*
<ul>
  {this.props.menuItems.map((elem, idx) => {
    let category = (<a href='#' style={{pointerEvents: 'none'}}>{elem}</a>);
    return <GenericItem onClick={this.onClickCallback(this)} hoverable={true} collapsible={false} key={idx} eventkey={`hover${idx}`} category={category} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild}/>
  })}
</ul>
*/
