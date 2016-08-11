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
    let text = getMessage(data, 'ja'); // ja or en
    console.log(text);
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
                'user': breakdown[1].trim(),
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

        // Death
        else if(type=='server thread/info' && text.match(/(\w+)? (.+)/i) ){
            let breakdown = text.match(/(\w+)? (.+)/i);
            return {
                'time': time,
                'type': 'death',
                'user': breakdown[1].trim(),
                'text': text
            }
        }
    }
    return false;
}

// 送信するメッセージを取得する。日本語(ja)か英語(en)
function getMessage(data, lang='ja') {
    let text = null;

    switch (data.type) {
        case 'joined':
            text = (lang=='ja' ? `${data.user} が参加しました` : data.text);
            break;
        case 'left':
            text = (lang=='ja' ? `${data.user} が退出しました` : data.text);
            break;
        case 'chat':
            text = `<${data.user}> ${data.text}`;
            break;
        case 'start':
            text = (lang=='ja' ? '>サーバが起動しました' : '>'+data.text);
            break;
        case 'stop':
            text = (lang=='ja' ? '>サーバが停止しました' : '>'+data.text);
            break;
        case 'death': //英語のみ
            text = data.text;
            break;
    }

    return text;
}