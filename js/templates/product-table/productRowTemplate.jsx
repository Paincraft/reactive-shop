import React from 'react';

export default function(){
  return (
    <div className="productRow">
      <h1>{this.props.name}</h1>
      <p>{this.props.description}</p>
    </div>
  );
};
