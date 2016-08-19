'use strict';

const request = require('request');
const ParseLog = require('./minecraft-log-parse');

module.exports = class extends ParseLog {
    constructor(channel, slackApiKey, lang) {
        super();
        this.channel = channel;
        this.slackApiKey = slackApiKey;
        this.lang = this.isset(lang) ? lang : 'en'; //デフォルト引数
        this.text = null;
    }

    setChannel(channel) {
        this.channel = channel;
    }

    getChannel() {
        return this.channel;
    }

    setSlackApikey(slackApikey) {
        this.slackApiKey = slackApikey;
    }

    /* ============================================================
     * Slackに送信
     * ------------------------------------------------------------
     * ログファイルの各行を解析してSlackにログを通知できる
     * 引数に応じて、送信するログの言語を日本語(ja)か英語(en)から選択できる
     * 対応していない、または送信しないログの場合は null を返す
     * チャンネル及びAPIキーが指定されていない場合、送信せずに送信するはずだったテキストを返す
     * 送信したテキストを返す
     */

    postMessage(line, lang) {
        this.lang = this.isset(lang) ? lang : this.lang; //デフォルト引数

        this.setParseLog(line);
        if(!this.data) return false;

        this.text = this.getMessage(this.data, this.lang);
        if(!this.text) return null;
        else if(!this.slackApiKey || !this.channel) return this.text;

        const options = {
            url : `https://slack.com/api/chat.postMessage?token=${this.slackApiKey}&channel=%23${this.channel}&text=${encodeURIComponent(this.text)}&as_user=true`
        };
        request(options, (error, response, body)=> {
            if(error) console.log(error);
        });

        return this.text;
    }

    /* ============================================================
     * 送信文章の選択
     * ------------------------------------------------------------
     * 解析済みのログデータから適切な文章を選ぶ
     * data.type に応じて文章を選ぶ
     * 一致するdata.typeではないとき null を返す
     * 引数に応じて、返す文章を日本語(ja)か英語(en)から選択できる
     */

    getMessage(data, lang) {
        let text = null;

        switch (data.type) {
            case 'joined':
                text = (lang==='ja' ? `${data.user} が参加しました` : data.text);
                break;
            case 'left':
                text = (lang==='ja' ? `${data.user} が退出しました` : data.text);
                break;
            case 'chat':
                text = `<${data.user}> ${data.text}`;
                break;
            case 'start':
                text = (lang==='ja' ? '>サーバが起動しました' : '>Starting minecraft server');
                break;
            case 'stop':
                text = (lang==='ja' ? '>サーバが停止しました' : '>Stopping the server');
                break;
            case 'death': //現在英語のみ
                text = data.text;
                break;
        }

        return text;
    }

    /* ============================================================
     * 死因ログの日本語化（未完成）
     * ------------------------------------------------------------
     * 解析済みの死因ログテキストを日本語翻訳して返す
     */
    /*
    transDeathLogJa(text) {
        let breakdown;

        if (text.indexOf('lava') !== -1) {
            text.match(/(.*?) tried to swim in lava|(.*?) tried to swim in lava while trying to escape (.*?)/);
        }
        else if (text.indexOf('fell') !== -1) {
            breakdown = text.match(/(.*?) fell from a high place|(.*?) fell off a ladder|(.*?) fell off some vines|(.*?) fell out of the world|(.*?) fell out of the water|(.*?) fell into a patch of fire|(.*?) fell into a patch of cacti|(.*?) fell from a high place and fell out of the world/);
        }
        else if (text.indexOf('shot') !== -1) {
            breakdown = text.match(/(.*?) was shot by arrow|(.*?) was shot by arrow|(.*?) was shot by (.*?)|(.*?) was shot by (.*?) using (.*?)|(.*?) was shot off some vines by (.*?)|(.*?) was shot off a ladder by (.*?)/);
        }
        else if (text.indexOf('killed') !== -1) {
            breakdown = text.match(/(.*?) was killed by magic|(.*?) was killed by (.*?) using magic|(.*?) was killed while trying to hurt (.*?)/);
        }
        else if (text.indexOf('slain') !== -1) {
            breakdown = text.match(/(.*?) was slain by (.*?)|(.*?) was slain by (.*?) using (.*?)/);
        }
        else if (text.indexOf('was') !== -1) {
            breakdown = text.match(/(.*?) was squashed by a falling anvil|(.*?) was pricked to death|(.*?) was pummeled by (.*?)|(.*?) was doomed to fall|(.*?) was blown up by (.*?)|(.*?) was blown from a high place by (.*?)|(.*?) was burnt to a crisp whilst fighting (.*?)|(.*?) was knocked into the void by (.*?)|(.*?) was fireballed by (.*?)|(.*?) was squashed by a falling block/);
        }
        else if (text.indexOf('walked') !== -1) {
            breakdown = text.match(/(.*?) walked into a cactus whilst trying to escape (.*?)|(.*?) walked into a fire whilst fighting (.*?)/);
        }
        else if (text.indexOf('drowned') !== -1) {
            breakdown = text.match(/(.*?) drowned|(.*?) drowned whilst trying to escape (.*?)/);
        }
        else if (text.indexOf('death') !== -1) {
            breakdown = text.match(/|(.*?) burned to death|(.*?) starved to death/);
        }
        else {
            breakdown = text.match(/(.*?) died|(.*?) suffocated in a wall|(.*?) blew up|(.*?) hit the ground too hard|(.*?) got finished off by (.*?) using (.*?)|(.*?) went up in flames|(.*?) withered away/);
        }
        return breakdown;
    }
    */

};