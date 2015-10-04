'use strict';

import React from 'react';
import moment from 'moment';

class Time extends React.Component {
  constructor () {
    super();
    this.displayName = 'time';
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
    var now = this.state.time.format('h:mm:ss'),
        meridian = this.state.time.format('a');
    return <div className="clock">{now}<span className="meridian">{meridian}</span></div>
  }
}

export default Time;
