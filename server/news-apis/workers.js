var aylien = require('../news-apis/aylien-helpers.js');
var googleTrends = require('../news-apis/google-trends-helpers.js');
var memStore = require('../db/memStore.js');
var async = require('async');

module.exports = prefetchWorker = function() {
  googleTrends.hotTrendsDetail(null, 5, 'US', function(list) {
    memStore.list = list;
    
    async.parallel({
      one: function(callback) {
        memStore.data[0].img = 'http://' + memStore.list[0]['ht:picture'][0].slice(2);
        memStore.data[0].traffic = memStore.list[0]['ht:approx_traffic'][0];
        aylien.getAnalysis(memStore.data[0], list[0].title[0], null, null, callback);
      },
      two: function(callback) {
        memStore.data[1].img = 'http://' + memStore.list[1]['ht:picture'][0].slice(2);
        memStore.data[1].traffic = memStore.list[1]['ht:approx_traffic'][0];
        aylien.getAnalysis(memStore.data[1], list[1].title[0], null, null, callback);
      },
      three: function(callback) {
        memStore.data[2].img = 'http://' + memStore.list[2]['ht:picture'][0].slice(2);
        memStore.data[2].traffic = memStore.list[2]['ht:approx_traffic'][0];
        aylien.getAnalysis(memStore.data[2], list[2].title[0], null, null, callback);
      },
      four: function(callback) {
        memStore.data[3].img = 'http://' + memStore.list[3]['ht:picture'][0].slice(2);
        memStore.data[3].traffic = memStore.list[3]['ht:approx_traffic'][0];
        aylien.getAnalysis(memStore.data[3], list[3].title[0], null, null, callback);
      },
      five: function(callback) {
        memStore.data[4].img = 'http://' + memStore.list[4]['ht:picture'][0].slice(2);
        memStore.data[4].traffic = memStore.list[4]['ht:approx_traffic'][0];
        aylien.getAnalysis(memStore.data[4], list[4].title[0], null, null, callback);
      }
    }, function(err, results) {
      if (err) {
        console.log('worker error: ', err);
      } else {
        console.log('worker finished');
      }
    });
  });

  
};