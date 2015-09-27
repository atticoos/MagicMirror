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
    StockView = require('./stock-view');

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
        <View style={styles.row}>
          <WeatherView></WeatherView>
        </View>
        <View style={styles.row}>
          <StockView symbols={stocks}></StockView>
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
    marginBottom: 10
  }
});

AppRegistry.registerComponent('MagicMirror', () => MagicMirror);
