const google = require('googleapis');
const key = require('../keys/HyphyBot-fee1938360b6.json');
const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
const viewId = 'ga:114124469';

queryData = function(analytics, callback) {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': viewId,
    'metrics': 'ga:uniquePageViews',
    'dimensions': 'ga:pagePath',
    'start-date': '1daysAgo',
    'end-date': 'yesterday',
    'sort': '-ga:uniquePageviews',
    'max-results': 10
  }, function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    // const formatted = JSON.stringify(res, null, 4);
    console.log('returning from ga');
    return callback(null, res);
  });
};

const gareport = function(callback) {
  jwtClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return
    }
    const analytics = google.analytics('v3');
    console.log('Authed with Googs!');
    return this.queryData(analytics, callback);
  });
};

module.exports = gareport;
