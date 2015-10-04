var currentSha;

function getSha () {
  return fetch('/sha').then(function (response) {
    return response.json();
  }).then(function (data) {
    return data.sha;
  });
}

function synchronize () {
  console.log('syncing');
  return getSha().then(function (sha) {
    console.log('currentsha', currentSha, 'newSha', sha, 'diff?', currentSha !== sha);
    if (currentSha !== sha) {
      console.log('redirecting');
      window.location = '/';
    }
  });
}

module.exports = {
  start: function () {
    getSha().then(function (sha) {
      console.log('starting')
      currentSha = sha;
      setInterval(synchronize, 10000);
    });
  }
};
