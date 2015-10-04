'use strict';

var React = require('react'),
    moment = require('moment');

module.exports = React.createClass({
  displayName: 'weather',
  getInitialState: function () {
    return {};
  },
  tick: function () {
    this.setState({});
  },
  componentDidMount: function () {
    // this.interval = setInterval(this.tick, 1000);
  },
  componentDidUnmount: function () {
    // clearInterval(this.interval);
  },
  render: function () {
    return (
      <div className="weather">
        55F (12C)
      </div>
    );
  }
});
