'use strict';
const request = require('request');
const chokidar = require('chokidar');
const execSync = require('child_process').execSync;
// Slack API キー
const slackApiKey = 'xxxxxxxxxxxxxxxxxxxxxxxx';

//chokidarの初期化
var watcher = chokidar.watch('./logs/latest.log',{
    ignored:/[\/\\]\./,
    persistent:true
});

watcher.on('ready', ()=> {
    console.log('ready watching...');
    watcher.on('change', ()=> {
        let tail = execSync('tail -n 1 ./logs/latest.log').toString().replace(/\r?\n/g,"");
        let data = parseLogLine(tail);
        if(data) sendSlack(data);
    });
});

function sendSlack(data) {
    let channel = 'log';
    let text = null;
    switch (data.type) {
        case 'joined':
            text = `${data.user} がゲームに参加しました`;
            break;
        case 'left':
            text = `${data.user} がゲームから退出しました`;
            break;
        case 'chat':
            text = `<${data.user}> ${data.text}`;
            break;
    }
    text = encodeURIComponent(text);
    const options= {
        url : `https://slack.com/api/chat.postMessage?token=${slackApiKey}&channel=%23${channel}&text=${text}&as_user=true`
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.name);
        } else {
            console.log('error: '+ response.statusCode + body);
        }
    });
}


function parseLogLine(line) {
    let matches = line.match(/\[([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})\]\s+\[([^\]]+)\]:\s+(.*?)$/i);
    if(matches) {
        let time = matches[1].trim(),
            type = matches[2].toLowerCase().trim(),
            text = matches[3].trim();

        // Join/Leave
        if(text.indexOf('joined the game')!=-1 || text.indexOf('left the game')!=-1) {
            let breakdown = text.match(/(.*?)(joined|left) the game/i);
            let action = breakdown[2].toLowerCase().trim();

            return {
                'time': time,
                'type': (action=='left' ? 'left' : 'joined'),
                'user': breakdown[1].trim(),
                'text': text
            };
        }

        // Chat
        else if(type=='server thread/info' && text.match(/<([^>]+)>\s+(.*?)$/i)) {
            let breakdown = text.match(/<([^>]+)>\s+(.*?)$/i);
            return {
                'time': time,
                'type': 'chat',
                'user': breakdown[1],
                'text': breakdown[2]
            }
        }
    }
    return false;
}
