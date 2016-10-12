import React from 'react';

export default class Product{
  static getTemplate(product){
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  }
};
