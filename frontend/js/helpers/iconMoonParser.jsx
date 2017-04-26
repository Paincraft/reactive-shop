import IcoMoon from "../resources/IcoMoon.json";
import React from 'react';
import classNames from 'classnames';

export function generateSvgDefinitions(){
  let wrapSymbols = (symbols) => {
    return (
      <svg style={{position: 'absolute', width:0, height:0, overflow: 'hidden'}} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'} xmlnsXlink={'http://www.w3.org/1999/xlink'}>
        <defs>
          {symbols}
        </defs>
      </svg>
    )
  }

  let icoSet = IcoMoon.selection.map((elem, idx) => {
    return (
      <symbol id={`icon-${elem.name}`} viewBox={'0 0 1024 1024'}>
        <title>{elem.name}</title>
        {IcoMoon.icons[idx].paths.map((pathElem, pathIdx) => {
          return (
            <path className={`path${pathIdx}`} d={pathElem}></path>
          )
        })}
      </symbol>
    );
  });

  return wrapSymbols(icoSet);
}

export function addIconSupport(elementToWrap){
  return (
    <div>
      {generateSvgDefinitions()}
      {elementToWrap}
    </div>
  )
}

export function getIconGenerator(name){
  let ico = (IcoMoon);
  if(ico && Array.isArray(ico.selection)){
    let selected = ico.selection.findIndex((elem) => {
      return elem.name === name;
    })

    if(selected >= 0){
      return (props) => {
        props.className = classNames('icon', props.className);
        return React.createElement('svg',props,(<use data-eventkey={props["data-eventkey"]} xlinkHref={`#icon-${name}`}></use>));
      }
    }
  }

  return null;
}
