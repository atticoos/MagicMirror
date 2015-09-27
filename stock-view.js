'use strict';

var React = require('react-native');
var Styles = require('./styles.js');
var _ = require('lodash');
var {
  StyleSheet,
  View,
  Text
} = React;

function fetchStockQuotes (symbols) {
  var endpoint = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=',
      promises = _.map(symbols, function (symbol) {
        return fetch(endpoint + symbol).then(function (result) {
          return result.json();
        });
      });
  return Promise.all(promises);
}

var StockView = React.createClass({
  getInitialState: function () {
    return {stocks: null};
  },
  updateStocks: function () {
    fetchStockQuotes(this.props.symbols).then(function (stocks) {
      this.setState({stocks: stocks});
    }.bind(this));
  },
  componentDidMount: function () {
    this.updateStocks();
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var stocks = this.state.stocks;
    var elements;
    if (stocks) {
      elements = _.map(stocks, function (stock) {
        return (
          <View style={styles.quote}>
            <Text style={styles.text}>
              {stock.Symbol} {stock.Change.toFixed(2)}
            </Text>
          </View>
        );
      });
      return (
        <View style={styles.row}>{elements}</View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  quote: {
    marginRight: 15
  },
  text: {
    color: '#fff',
    fontSize: Styles.fontSize.normal
  }
});

module.exports = StockView;
