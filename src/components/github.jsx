'use strict';

import React from 'react';
import _ from 'lodash';

const REFRESH_INTERVAL = 60 * 15 * 1000; // 15 minutes

class GithubComponent extends React.Component {
  constructor () {
    super();
    this.displayName = 'github';
    this.state = {notifications: []};
  }

  componentDidMount () {
    this.updateNotifications().then(function () {
      this.refreshInterval = setInterval(this.updateNotifications, REFRESH_INTERVAL);
    }.bind(this));
  }

  updateNotifications () {
    return fetch('/github').then(function (response) {
      return response.json();
    }).then(function (notifications) {
      this.setState({notifications: notifications});
    }.bind(this));
  }

  render () {
    var notifications = this.state.notifications;
    var notificationElements = _.map(notifications, function (notification) {
      return (
        <div key={notification.id}>
          {notification.repository.full_name}
          -
          {notification.subject.title}
        </div>
      );
    });

    return (
      <div className="github">
        <h2>Latest Work Notifications <i className="fa fa-github"></i></h2>
        <div class="notification">
          {notificationElements}
        </div>
      </div>
    );
  }
}

export default GithubComponent;
