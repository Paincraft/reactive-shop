'use strict';
import React from 'react';
import ShadowDOM from 'react-shadow';

export default function(){
  return (
    <ShadowDOM>
      <div>
        <div className={this.props.classList} id={this.props.id}>
          {this.rows}
        </div>
      </div>
    </ShadowDOM>
  );
};
