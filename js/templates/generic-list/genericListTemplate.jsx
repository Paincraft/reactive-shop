'use strict';
import React from 'react';
import ShadowDOM from 'react-shadow';

export default function(){
  return (
    <ShadowDOM>
      <div>
        <div className={this.props.classList}>
          {this.rows}
        </div>
      </div>
    </ShadowDOM>
  );
};
