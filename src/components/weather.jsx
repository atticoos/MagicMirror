'use strict';
var INTERVAL = 60 * 15 * 1000; // 15 minutes
var React = require('react'),
    moment = require('moment');

function getWeather () {
  return fetch('/weather').then(function (response) {
    return response.json();
  });
}

function getCelcius (fahrenheit) {
  return parseInt((fahrenheit - 32) * (5/9))
}

module.exports = React.createClass({
  displayName: 'weather',
  getInitialState: function () {
    return {weather: null};
  },
  updateWeather: function () {
    return getWeather().then(function (weather) {
      this.setState({weather: weather});
    }.bind(this));
  },
  componentDidMount: function () {
    this.updateWeather().then(function () {
      this.interval = setInterval(this.updateWeather, INTERVAL);
    }.bind(this));
  },
  componentDidUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var weather = this.state.weather;
    if (!weather) {
      return <div></div>;
    }
    return (
      <div className="weather">
        <span className={'icon icon-' + weather.currently.icon}></span>
        <span className="temperature">
          {parseInt(weather.currently.temperature)}
          <span className="super">o</span>
          F
        </span>


        <span className="temperature">
          ({getCelcius(weather.currently.temperature)}
          <span className="super">o</span>
          C)
        </span>
      </div>
    );
  }
});
