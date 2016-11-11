import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const reactElementSymbol = (<a></a>).$$typeof;

class ComponentBoilerplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cssClasses: classNames(this.props.classList)
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cssClasses)
      this.setState({cssClasses: nextProps.cssClasses});
  }

  render() {
    this.render = template.bind(this);
    return this.render();
  }
}
