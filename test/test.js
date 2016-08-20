'use strict';
const Slack = require('./../lib/post-slack');
const slack = new Slack(null, null, 'ja');

let log = {
    'join': '[18:38:21] [Server thread/INFO]: roamer7038 joined the game',
    'left': '[18:38:37] [Server thread/INFO]: roamer7038 left the game',
    'uuid': '[18:38:21] [User Authenticator #2/INFO]: UUID of player roamer7038 is 60d9e56f-xxxx-xxxx-xxxx-5a9955e8480b',
    'start': '[06:09:47] [Server thread/INFO]: Done (3.509s)! For help, type "help" or "?"',
    'stop': '[06:00:01] [Server thread/INFO]: Stopping the server',
    'login': '[18:38:21] [Server thread/INFO]: roamer7038[/218.221.54.44:47346] logged in with entity id 11917 at (-242.31189278422755, 72.0, 337.9420783182418)',
    'chat': '[18:38:34] [Server thread/INFO]: <roamer7038> チャットテスト',
    'death1': '[18:38:34] [Server thread/INFO]: roamer7038 died',
    'death2': '[18:38:34] [Server thread/INFO]: roamer7038 tried to swim in lava while trying to escape Creeper',
    'other1': '[06:09:44] [Server thread/INFO]: Starting minecraft server version 1.10.2',
    'other2': '[21:13:01] [Server thread/INFO]: Toggled downfall',
    'test': 'Test Message'
};


console.log(`
========== ParseLog ===========
                               `);
for(let key in log) {
    console.log(key +' : '+ slack.parseLogLine(log[key]).text);
}

console.log(`
========= PostMessage =========
                               `);
for(let key in log) {
    console.log(key +' : '+ slack.postMessage(log[key]));
}