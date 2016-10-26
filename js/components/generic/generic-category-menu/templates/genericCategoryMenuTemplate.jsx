import React from 'react';
import ShadowDOM from 'react-shadow';

function getComponentBody(wrapped){
  if(wrapped){
    return (
      <div>
        <div className={this.state.cssClasses} id={this.props.id}>
          {this.parseCategories(this.props.categories, 0)}
        </div>
      </div>
    );
  }else{
    return this.parseCategories(this.props.categories, 0);
  }
}

export default function() {
  if(this.props.enableShadowRoot){
    return (
      <ShadowDOM include={[this.props.cssPath]}>
        {getComponentBody.bind(this)(true)}
      </ShadowDOM>
    )
  }else{
    return getComponentBody.bind(this)(this.props.wrapped);
  }
}
