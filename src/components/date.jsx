'use strict';

import React from 'react';
import moment from 'moment';

class Date extends React.Component {
  constructor () {
    super();
    this.displayName = 'date';
    this.state = {time: moment()};
  }

  tick () {
    this.setState({time: moment()});
  }

  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentDidUnmount () {
    clearInterval(this.interval);
  }

  render () {
    if (!this.state.time) {
      return <div></div>;
    }
    var now = this.state.time.format('dddd, MMMM D');
    return <div className="date">{now}</div>;
  }
}

export default Date;
