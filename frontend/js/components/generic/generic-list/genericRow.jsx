import React from 'react';
import classNames from 'classnames';

export default class GenericRow extends React.Component {
  constructor(props) {
    super(props);
    this.setCssClasses = function(state){
      return classNames(this.props.classList, {active: state.active}, {hidden: state.hidden});
    }
    this.state = {
      active: false,
      hidden: this.props.hidden,
    };

  }

  handleClick(event) {
    let newState = {
      active: !this.state.active
    }
    newState.cssClasses = setCssClasses(newState);
    this.setState(newState);
    if (this.props.onClick && typeof this.props.onClick === 'function')
      this.props.onClick.call(this, event)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.hidden !== this.state.hidden){
      let newState = {hidden: nextProps.hidden};
      newState.cssClasses = this.setCssClasses(newState);
      this.setState(newState);
    }
  }

  componentWillMount(){
    this.setState({cssClasses: this.setCssClasses(this.state)});
  }

  render() {
    return (
      <div className={this.state.cssClasses} onClick={this.handleClick.bind(this)}>
        {this.props.content}
      </div>
    )
  }
}
