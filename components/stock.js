'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var TweenState = require('react-tween-state');
var _ = require('lodash');
var {
  StyleSheet,
  Dimensions,
  View,
  Text
} = React;

var WINDOW_WIDTH = Dimensions.get('window').width;

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
  mixins: [TweenState.Mixin],
  getInitialState: function () {
    return {stocks: null, left: 0};
  },
  updateStocks: function () {
    return fetchStockQuotes(this.props.symbols).then(function (stocks) {
      this.state.stocks = stocks;
      this.setState(this.state);
    }.bind(this));
  },
  animateStocks: function (direction) {
    direction = direction || 'right';
    this.refs.slider.measure(function (x, y, width, height) {
      var endValue = direction === 'right' ? (width - WINDOW_WIDTH) + 10 : 0;
      if (width > WINDOW_WIDTH) {
        this.tweenState('left', {
          easing: TweenState.easingTypes.linear,
          duration: this.state.stocks.length * 1000,
          endValue: -endValue,
          onEnd: function () {
            setTimeout(this.animateStocks.bind(this, direction === 'right' ? 'left' : 'right'), 1000);
          }.bind(this)
        });
      }
    }.bind(this));
  },
  componentDidMount: function () {
    this.updateStocks().then(function () {
      setTimeout(this.animateStocks.bind(this, 'right'), 1000);
    }.bind(this));
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var stocks = this.state.stocks;
    var elements;
    if (stocks) {
      elements = _.map(stocks, function (stock, index) {
        var color = stock.Change > 0 ? Styles.colors.green : Styles.colors.red;
        return (
          <View style={styles.quote} key={index}>
            <Text style={styles.text}>{stock.Symbol} </Text>
            <Text style={[styles.text, {color: color}]}>{Math.abs(stock.Change).toFixed(2)}</Text>
          </View>
        );
      });
      for (var i = elements.length-1; i > 0; i--) {
        elements.splice(i, 0, (
            <Text style={styles.separator}>-</Text>
        ));
      }
      return (
        <View
          ref="slider"
          onLayout={function(){}}
          style={[styles.row, {left: this.getTweeningValue('left')}]}>
          {elements}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    left: 0,
    bottom: 0,
    position: 'absolute'
  },
  quote: {
    marginRight: 15,
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    fontSize: Styles.fontSize.normal
  },
  separator: {
    color: '#fff',
    fontSize: 20,
    marginRight: 15
  }
});

module.exports = StockView;
