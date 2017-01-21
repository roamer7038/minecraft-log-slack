'use strict';

const Tail = require('tail').Tail;
const Slack = require('./lib/post-slack');
const config = require('./config.json');

const tail = new Tail(config.path);
const slack = new Slack(config.channel, config.apiKey, config.lang);

// ログ監視
tail.on('line', (data) => {
  let post = slack.postMessage(data);
  if (post) console.log(post);
});

tail.on('error', (data) => {
  console.log("error:", data);
});
