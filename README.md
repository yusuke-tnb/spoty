# Getting start

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

## about infrastructure
基本的に全てdockerで動かしてあるのでdockerが動く環境であればどこでも動きます。
