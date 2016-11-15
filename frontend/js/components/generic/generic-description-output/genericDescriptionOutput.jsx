import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

/*props{
  content: Element,
  capped: int,
  classList: []
}
*/

export default class GenericDescriptionOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capped: (this.props.content.length - 3 >= this.props.capped) ? true : false;
      cssClasses: classNames(this.props.classList)
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.classList)
      this.setState({cssClasses: nextProps.classList});
  }

  trimContent(content){
    if(Number.isInteger(this.props.capped)){
      if(content.length > 0 && this.props.capped >= content.length - 3){
        content += '...';
      }else{
        let acc = '';
        let contentByWords = content.split(' ');
        if(Array.isArray(contentByWords)){
          contentByWords.every(((elem) => {
            console.log('contentByWords',acc.length + elem.length, this.props.capped)
            if((acc.length + elem.length + 3) >  this.props.capped){
              acc += '...';
              return false;
            }else{
              acc = (acc.length === 0) ? `${elem}` : `${acc} ${elem}`;
              return true;
            }
          }).bind(this))
          content =  acc;
        }
      }
    }
    return content;
  }

  render() {
    return (<div><span>{trimContent(this.props.content)}</span></div>);
  }
}
