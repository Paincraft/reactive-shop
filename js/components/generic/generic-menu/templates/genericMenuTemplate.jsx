import React from 'react';
import GenericItem from '../../generic-category-menu/GenericCategoryItem.jsx';
import ShadowDOM from 'react-shadow';

export default function() {
  return (
    <ShadowDOM include={[this.props.cssPath]}>
      <div>
        <menu className={this.state.cssClasses}>
          <nav>
            <ul>
              {this.props.menuItems.map((elem, idx) => {
                let category = (<a href='#' style={{pointerEvents: 'none'}}>{elem}</a>);
                return <GenericItem onClick={this.onClickCallback(this)} hoverable={true} collapsible={false} key={idx} eventkey={`hover${idx}`} category={category} classList={this.props.listElementClassList} currentActiveChild={this.state.currentActiveChild}/>
              })}
            </ul>
          </nav>
        </menu>
      </div>
    </ShadowDOM>
  )
}
