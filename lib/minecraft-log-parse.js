'use strict';

const _deaths = require('./data').deaths;
const deaths = []; // [{name, regex, trans}]
Object.keys(_deaths).forEach(name => {
    _deaths[name].forEach(x => deaths.push({name, regex: x.regex, trans: x.trans}));
});

module.exports = class {
    constructor() {
        this.data = null;
    }

    setParseLog(line) {
        this.data = this.parseLogLine(line);
    }

    getParseLog() {
        return this.data;
    }

    /* ============================================================
     * ログ解析
     * ------------------------------------------------------------
     * ログファイルの各行を解析する
     * 連想配列 か false を返す
     * 一致しない場合 false を返す
     * 連想配列は条件に応じて返す
     */

    parseLogLine(line) {
        let matches = line.match(/\[([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})\]\s+\[([^\]]+)\]:\s+(.*?)$/i);
        if(matches) {
            let time = matches[1].trim(),
                type = matches[2].toLowerCase().trim(),
                text = matches[3].trim();

            // Chat
            if(type==='server thread/info' && text.match(/^<([^>]+)>\s+(.*?)$/i)) {
                let breakdown = text.match(/<([^>]+)>\s+(.*?)$/i);

                return {
                    'time': time,
                    'type': 'chat',
                    'user': breakdown[1].trim(),
                    'text': breakdown[2]
                }
            }

            // Log in information
            // UUID of player roamer7038 is 60d9e56f-xxxx-xxxx-xxxx-5a9955e8480b
            else if(text.indexOf('UUID of player')!==-1 && text.match(/UUID of player (\S+) is (\S+)/i)) {
                let breakdown =  text.match(/UUID of player (\S+) is (\S+)/i);

                return {
                    'time': time,
                    'type': 'uuid',
                    'user': breakdown[1].trim(),
                    'text': breakdown[2]
                }
            }

            // Lag
            else if(text.indexOf('Can\'t keep up! Did the system time change, or is the server overloaded?')!==-1 // Vanilla
                || text.indexOf('--- Server Lag:')!==-1 // Rainbow Project
            ) {
                //Can't keep up! Did the system time change, or is the server overloaded? Running 2040ms behind, skipping 40 tick(s)
                let breakdown = text.match(/Running ([0-9]+)ms behind, skipping ([0-9]+) tick/i);

                return {
                    'time': time,
                    'type': 'lag',
                    'text': {
                        'text': text,
                        'latency': breakdown[1],
                        'ticks': breakdown[2]
                    }
                }
            }

            // Login IP and Coords
            else if(text.indexOf('logged in with entity id')!==-1) {
                // roamer7038[/202.180.86.136:34280] logged in with entity id 1437768 at ([world]602.2744076595088, 64.0, -39.02937949785859)
                let breakdown = text.match(/(.*?)\[\/?(.*?):[0-9]+\] logged in with entity id [0-9]+ at \((\[([A-z0-9_-]+)\])?\s*(-?[0-9\.]+),\s*(-?[0-9\.]+),\s*(-?[0-9\.]+)\)/i);

                return {
                    'time': time,
                    'type': 'login',
                    'user': breakdown[1].trim(),
                    'ip': breakdown[2].trim(),
                    'coords': {
                        'dimension': (this.isset(breakdown[4]) ? breakdown[4] : ''),
                        'x': (this.isset(breakdown[5]) ? breakdown[5] : ''),
                        'y': (this.isset(breakdown[6]) ? breakdown[6] : ''),
                        'z': (this.isset(breakdown[7]) ? breakdown[7] : '')
                    },
                    'text': text
                }
            }

            // Join/Leave
            else if(text.indexOf('joined the game')!==-1 || text.indexOf('left the game')!==-1) {
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
            else if(type==='server thread/info'
                && !text.match(/Starting|Preparing|Generating|Loading|Using|[\:\.\,\[\/]/)
                && this.regDeathLog(text)) {

                return {
                    'time': time,
                    'type': 'death',
                    'text': text
                }
            }
        }

        return false;
    }

    /* ============================================================
     * 死因解析
     * ------------------------------------------------------------
     * テキストから死因を解析する
     * 一致する場合は Entity名と死因をそれぞれ分割して 配列 に返す
     * 一致しない場合は null を返す
     */

    regDeathLog(text) {
        const death = deaths.find(x => x.regex.test(text));
        if (!death) return null;

        const matched = text.match(death.regex);
        // do something

        return matched;
    }

    isset(data) {
        return ( typeof( data ) !== 'undefined' );
    }

    //
};