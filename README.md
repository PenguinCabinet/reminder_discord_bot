# Discord リマインダー Bot
「Discord リマインダー Bot」はOSSのDiscordリマインダーBotです

# 稼働中のクラウド版
準備中…

# 特徴
*  テキストだけで操作できリマインドできます
*  Discord Botなので思いついたときにすぐリマインド設定できます
* 「Discord リマインダー Bot」はオンプレミス環境で動作しOSSです
* 「Discord リマインダー Bot」はDockerを利用しているため、簡単にデプロイできます
* 「Discord リマインダー Bot」はクラウドサービスを利用していません
* 「Discord リマインダー Bot」はラズパイ上で動作することができます(ARMv6はサポートしていません)

# Quick strat

## 構築方法(推奨方法)

```bash
git clone https://github.com/PenguinCabinet/reminder_discord_bot
cd reminder_discord_bot
vim docker-compose-example.yml 
# docker-compose-example.ymlの環境変数のBOT_KEYに開発者ページで作成したDiscord BotのKeyを入力してください
#もしくはホストOS上で"export reminder_BOT_KEY=<your discord bot key>"を実行します
docker-compose -f docker-compose-example.yml up -d
```

## 構築方法(ほかのやりかた)

自前でビルドするため、時間がかかります

```bash
git clone https://github.com/PenguinCabinet/reminder_discord_bot
cd yominon
vim docker-compose.yml 
# docker-compose.ymlの環境変数のBOT_KEYに開発者ページで作成したDiscord BotのKeyを入力してください
#もしくはホストOS上で"export reminder_BOT_KEY=<your discord bot key>"を実行します
docker-compose up -d
```

## Botの作成

[Discordの開発者ページ](http://discord.com/developers/)にアクセスしてBotを作成したのち、「Discord リマインダー Bot」に適切な権限を与えてください
```markdown
「Discord リマインダー Bot」に必要な権限
* メッセージを読む
* メッセージの履歴を読む
```

#  使い方
DMにのみ対応していて、サーバーでのBot使用は想定しておりません。

## ping
「!ping」と送ると「Pong!」と返してくれます   
動作確認にお使いください
## リマインド構文一覧
これらの構文は組み合わせが可能です。
## 数分後にリマインド
「10分後リマインド」と送ると現在時刻から10分経過後に「リマインド」と送ってくれます。   
「10分後」の部分が送る時刻を指定する場所です。リマインドするテキストを変えたい場合、   
「10分後うぇーい」と送ると現在時刻から10分経過後に「うぇーい」と送ってくれます。   

## 数時間後にリマインド
「1時間後リマインド」と送ると現在時刻から1時間経過後に「リマインド」と送ってくれます。   
前記と組み合わせて、「1時間後10分後リマインド」と送ると、現在時刻から1時間10分経過後に「リマインド」と送ってくれます。   

## 数日後にリマインド
「1日後リマインド」と送ると現在時刻から1日経過後に「リマインド」と送ってくれます。   
例えば、1月1日13時0分に「1日後リマインド」と送ると、1月2日13時0分に「リマインド」と送られるわけです。  
前記2つと組み合わせて、「1日後1時間後10分後リマインド」と送ると、現在時刻から1日と1時間10分経過後に「リマインド」と送ってくれます。   
また、後述する指定時刻構文と組み合わせて、1月1日に「1日後**14時10分**リマインド」と送ると1月2日14時10分に「リマインド」と送られます。 


## 指定時刻にリマインド
例えば1月1日に「11時テスト」と送ると、1月1日の11時0分に「テスト」と送られます    
午後の場合「14時テスト」と送ると、1月1日の14時0分に「テスト」と送られます   
また、分まで指定したい場合「11時5分テスト」と送ると、1月1日の11時5分に「テスト」と送られます  

## 過去にリマインドを送りたいんだけど
電子レンジに接続したX68000をブラウン管の上で起動し、それを経由してパケットを送信してください   
ああ、一度に送れる文字数は全角18文字、半角36文字なのでお気をつけて

