/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var DateView = require('./date-view'),
    TimeView = require('./time-view'),
    WeatherView = require('./weather-view'),
    StockView = require('./stock-view'),
    TwitterView = require('./twitter-view'),
    GithubView = require('./github-view');

var MagicMirror = React.createClass({
  render: function() {
    var stocks = ['FB', 'TWTR', 'AAPL', 'GOOGL', 'MSFT', 'TSLA'];
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <DateView></DateView>
        </View>
        <View style={styles.row}>
          <TimeView></TimeView>
        </View>
        <View style={[styles.row, styles.margin]}>
          <WeatherView></WeatherView>
        </View>
        <View style={styles.row, styles.margin}>
          <StockView symbols={stocks}></StockView>
        </View>
        <View style={styles.row, styles.margin}>
          <TwitterView></TwitterView>
        </View>
        <View style={styles.row}>
          <GithubView></GithubView>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  margin: {
    marginBottom: 30
  }
});

AppRegistry.registerComponent('MagicMirror', () => MagicMirror);
