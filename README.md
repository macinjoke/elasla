# elasla

WIP

Slack のメッセージログデータを Elasticsearch にいれてWeb から検索できるようにする。

バックエンド: https://github.com/macinjoke/elasla-backend

![画面](https://i.gyazo.com/3c5bef299c138cdac9f48b05be5054f5.png)

# 背景
macinjoke の所属する研究室のSlack が無料プランなのですぐに古いメッセージが読めなくなる。

↓

Elasticsearch にログデータを貯めて、検索できるようにすれば便利では。

↓

そのための認証システムやWebフロントを作ってみよう。

# 機能
APIを叩いてElasticsearch のデータを表示するSPAフロントエンド。非SSR。
バックエンド側のリポジトリは[ここ](https://github.com/macinjoke/elasla-backend)。

(現在試しにフロントからElasticsearch サーバへ直接アクセスしているが、もちろんバックエンド側に処理させる予定)
