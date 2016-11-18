import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Helpers from '../../../helpers/helpers.jsx';


export default class GenericSelect extends React.Component {
  constructor(props) {
    super(props);
    this.options = this.props.options || [];
    this.state = {
      cssClasses: classNames(this.props.classList),
      selectedElements: this.props.selectedElements || [],
      options: this.options || []
    };
  }

  handleOnKeyUp(event){
    event.preventDefault();
    event.stopPropagation();
    let value = this.filter.value;
    this.setState({
      options: this.options.filter((option) => {
        return option.includes(value);
      })
    })
  }

  render(){
    let componentUI = (
      <div>
        <input ref={(filter) => {this.filter = filter}} onKeyUp={this.handleOnKeyUp.bind(this)} type={"text"} />
        <ul>
          {this.state.options.map((option) => {
            return (<li>{option}</li>);
          })}
        </ul>
        <div>
          {this.state.selectedElements.map((element) => {
            return (<span>{element}</span>);
          })}
        </div>
      </div>
    );

    if(this.props.enableShadowRoot) return Helpers.wrapInShadowRoot(componentUI);
    return componentUI;
  }
}
