'use strict';
const INTERVAL = 60 * 15 * 1000; // 15 minutes

import React from 'react';
import moment from 'moment';

function getWeather () {
  return fetch('/weather').then(function (response) {
    return response.json();
  });
}

function getCelcius (fahrenheit) {
  return parseInt((fahrenheit - 32) * (5/9))
}

class Weather extends React.Component {
  constructor () {
    super();
    this.displayName = 'weather';
    this.state = {weather: null};
  }

  updateWeather () {
    return getWeather().then(function (weather) {
      this.setState({weather: weather});
    }.bind(this));
  }

  componentDidMount () {
    this.updateWeather().then(function () {
      this.interval = setInterval(this.updateWeather.bind(this), INTERVAL);
    }.bind(this));
  }

  componentDidUnmount () {
    clearInterval(this.interval);
  }

  render () {
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
}

export default Weather;
