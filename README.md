# Minecraft-Log-Slack
 Minecraftのログを監視してSlackに通知する．
 
 ![スクリーンショット](https://raw.githubusercontent.com/roamer7038/minecraft-log-slack/image/screenshot.png)

## Setting
 `config.json`を編集して．
 
 * path: `latest.log`のパス
 * apiKey: SlackのAPIキー
 * lang: `en` か `ja`
 * channel: Slackチャンネル名
 
## Usage
 pm2 のインストール

`sudo npm install pm2 -g`

 pm2の自動起動

`sudo pm2 startup centos`

 pm2 にスクリプトを登録

`sudo pm2 start index.js`

## License
MIT

Copyright (c) 2015-2017 @roamer7038 
