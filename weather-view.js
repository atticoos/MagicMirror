'use strict';

var React = require('react-native'),
    Config = require('./env.js'),
    Styles = require('./styles');
var {
  StyleSheet,
  View,
  Text
} = React;

function fetchWeatherReport () {
  var requestEndpoint = 'https://api.forecast.io/forecast/' + Config.forecastio.access_token + '/';
  requestEndpoint += '43.918364,-78.683535';
  return fetch(requestEndpoint).then(function (response) {
    return response.json();
  });
}

var WeatherView = React.createClass({
  getInitialState: function () {
    return {weather: null};
  },
  updateWeather: function () {
    fetchWeatherReport().then(function (weather) {
      var report = {
        now: {
          summary: weather.currently.summary,
          icon: weather.currently.icon,
          temperature: {
            f: parseInt(weather.currently.temperature),
            c: parseInt((weather.currently.temperature - 32) * (5/9))
          }
        },
        today: {
          summary: weather.daily.data[0].summary,
          icon: weather.daily.data[0].icon,
          temperature: {
            high: {
              f: parseInt(weather.daily.data[0].temperatureMax),
              c: parseInt((weather.daily.data[0].temperatureMax - 32) * (5/9))
            },
            low: {
              f: parseInt(weather.daily.data[0].temperatureMin),
              c: parseInt((weather.daily.data[0].temperatureMin - 32) * (5/9))
            }
          }
        }
      }
      this.setState({weather: report});
    }.bind(this));
  },
  componentDidMount: function () {
    // fetch weather information
    this.updateWeather();
    setInterval(this.updateWeather, 1000 * 60 * 60); // 1 hour updates
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var weather = this.state.weather;
    if (weather) {

      return (
        <View style={styles.root}>
          <View style={styles.row}>
            <Text style={styles.weather}>{weather.today.summary} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.weather}>Currently </Text>
            <Text style={styles.weather}>{weather.now.temperature.f}</Text>
            <Text style={styles.superscript}>F </Text>
            <Text style={styles.weather}>({weather.now.temperature.c}</Text>
            <Text style={styles.superscript}>C</Text>
            <Text style={styles.weather}>) with a high of {weather.today.temperature.high.f}</Text>
            <Text style={styles.superscript}>F </Text>
            <Text style={styles.weather}>({weather.today.temperature.high.c}</Text>
            <Text style={styles.superscript}>C</Text>
            <Text style={styles.weather}>)</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
});

var styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  weather: {
    fontSize: Styles.fontSize.normal,
    color: '#fff'
  },
  superscript: {
    fontSize: Styles.fontSize.normal - 10,
    color: '#fff'
  }
});

module.exports = WeatherView;
