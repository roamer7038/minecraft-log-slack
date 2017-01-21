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
    if (!this.data) return false;

    this.text = this.getMessage(this.data, this.lang);
    if (!this.text) return null;
    else if (this.slackApiKey && this.channel) {
      const options = {
        url: `https://slack.com/api/chat.postMessage?token=${this.slackApiKey}&channel=%23${this.channel}&text=${encodeURIComponent(this.text)}&as_user=true`
      };
      request(options, (error, response, body) => {
        if (error) console.log(error);
      });
    }

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
        text = (lang === 'ja' ? `${data.user} が参加しました` : data.text);
        break;
      case 'left':
        text = (lang === 'ja' ? `${data.user} が退出しました` : data.text);
        break;
      case 'chat':
        text = `<${data.user}> ${data.text}`;
        break;
      case 'start':
        text = (lang === 'ja' ? '>サーバが起動しました' : '>Starting minecraft server');
        break;
      case 'stop':
        text = (lang === 'ja' ? '>サーバが停止しました' : '>Stopping the server');
        break;
      case 'death':
        text = (lang === 'ja' ? data.trans : data.text);
        break;
    }

    return text;
  }
};
