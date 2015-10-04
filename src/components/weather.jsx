'use strict';
const INTERVAL = 60 * 15 * 1000; // 15 minutes

import React from 'react';
import moment from 'moment';
import _ from 'lodash';

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

  renderForecast (forecast) {
    return _.map(this.state.weather.daily.data, function (day) {
      return (
        <div key={day.time} className="item">
          <div className="icon">
            <span className={'icon-' + day.icon}></span>
          </div>
          <div className="day">
            {moment.unix(day.time).format('dddd')}
          </div>
          <div className="temp">
            <span className="temperature">
              {parseInt(day.temperatureMax)}
              <span className="super">o</span>
              F
            </span>


            <span className="temperature">
              ({getCelcius(day.temperatureMax)}
              <span className="super">o</span>
              C)
            </span>
          </div>
        </div>
      );
    });
  }

  render () {
    var weather = this.state.weather;
    if (!weather) {
      return <div></div>;
    }

    return (
      <div className="weather">
        <div className="now">
          <h1>
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
          </h1>
        </div>
        <div className="forecast">
          {this.renderForecast()}
        </div>
      </div>
    );
  }
}

export default Weather;
