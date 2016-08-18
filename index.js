'use strict';
const Tail = require('tail').Tail;
const Slack = require('./lib/post-slack');

// ログファイル
const filename = "../logs/latest.log";
const tail = new Tail(filename);

// Slack API キー
const slackApiKey = '';
const slack = new Slack('log', slackApiKey, 'ja');

// ログ監視
tail.on('line', (data)=> {
    console.log(slack.postMessage(data));
});

tail.on('error', (data)=> {
    console.log("error:", data);
});
