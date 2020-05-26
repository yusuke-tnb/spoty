# Getting start

## clone files
`git clone git@bitbucket.org:fan_letter/mate.git`

## make environment file
### main
`cp .env.example .env`

### backend
`cp api/config/conf.js.example api/config/conf.js`
`cd api && sh ./makekey.sh && cd ..`

### frontend
no data

## build and start
`docker-compose build && docker-compose up -d`

- デフォルト設定
  - 19080でフロント
  - 19081でバックエンド
が立ち上がります

`.env`ファイルで設定している

## deploy
`git push origin master`
でCircleCIを通してbuildチェックした後デプロイされます。
テストはまだ書いて無いですごめんなさい。

`.circleci/config.yml`にコンフィグが書いてあります

## about infrastructure
基本的に全てdockerで動かしてあるのでdockerが動く環境であればどこでも動きます。
サーバー(dev:35.196.105.32)はGCPで動いています。
サービスが大きくなったらスケールするなりロードバランサ噛ませるなりしてください。

サービスの中でTwitterのOAuth認証使っていて中ではfirebaseのAuthentication使ってるのでそのあたりの設定はfirebaseを見てください。

ドメイン(spotyapp.jp)はお名前で取得後、ネームサーバをcloudflareに設定し、cloudflareで管理しています。
meteoputi@gmail.comのアドレスでアカウントが作ってあります。
[パスワードとか諸々の情報はこれと同じです。](https://next-paradigm.slack.com/archives/CCHQ7NN76/p1545215906000900)
