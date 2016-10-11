import React from 'react';
import ShadowDOM from 'react-shadow';

export default function(){
  return (
    <ShadowDOM>
      <div>
        <div className="productTable">
          {this.products}
        </div>
      </div>
    </ShadowDOM>
  );
};
