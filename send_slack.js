'use strict';
const request = require('request');
const Tail = require('tail').Tail;
// ログファイル
const filename = "../logs/latest.log";
// Slack API キー
const slackApiKey = '';

const tail = new Tail(filename);

// ログ監視
tail.on('line', (data)=> {
    let log = parseLogLine(data);
    if(log) sendSlack(log);
});

tail.on('error', (data)=> {
    console.log("error:", data);
});

// Slackに送る
function sendSlack(data) {
    let channel = 'log';
    let text = null;
    switch (data.type) {
        case 'joined':
            text = `${data.user} が参加しました`;
            break;
        case 'left':
            text = `${data.user} が退出しました`;
            break;
        case 'chat':
            text = `<${data.user}> ${data.text}`;
            break;
        case 'start':
            text = `>サーバが起動しました`;
            break;
        case 'stop':
            text = `>サーバが停止しました`;
            break;
    }
    text = encodeURIComponent(text);
    const options= {
        url : `https://slack.com/api/chat.postMessage?token=${slackApiKey}&channel=%23${channel}&text=${text}&as_user=true`
    };
    request(options, function (error, response, body) {
    });
}

// 1行のログを連想配列に整理する
function parseLogLine(line) {
    let matches = line.match(/\[([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})\]\s+\[([^\]]+)\]:\s+(.*?)$/i);
    if(matches) {
        let time = matches[1].trim(),
            type = matches[2].toLowerCase().trim(),
            text = matches[3].trim();

        // Chat
        if(type=='server thread/info' && text.match(/<([^>]+)>\s+(.*?)$/i)) {
            let breakdown = text.match(/<([^>]+)>\s+(.*?)$/i);
            return {
                'time': time,
                'type': 'chat',
                'user': breakdown[1],
                'text': breakdown[2]
            }
        }

        // Join/Leave
        else if(text.indexOf('joined the game')!=-1 || text.indexOf('left the game')!=-1) {
            let breakdown = text.match(/(.*?)(joined|left) the game/i);
            let action = breakdown[2].toLowerCase().trim();

            return {
                'time': time,
                'type': (action=='left' ? 'left' : 'joined'),
                'user': breakdown[1].trim(),
                'text': text
            };
        }

        // Start/Stop
        else if(text.match(/^\s*Stopping the server/i) || text.match(/Done \([0-9]+.*[0-9]*\)\! For help, type \"help\" or \"\?\"/i)) {
            let breakdown = text.match(/(Stopping|Done)/i);
            let action = breakdown[1].toLowerCase().trim();
            return {
                'time': time,
                'type': (action=='stopping' ? 'stop' : 'start'),
                'text': text
            }
        }
    }
    return false;
}
