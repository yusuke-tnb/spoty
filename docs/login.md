# Group Login
## Login [POST /login]

ログイン用のトークンを返す
ユーザー登録されてなければ新規追加する

+ Request

    + Headers

                Content-Type: application/json

    + Attributes (RegisterBody)

+ Response 200 (application/json)

    + Attributes

        + message: `failed` (string)
        + data (LoginRes) 
        + error: true (boolean)

## master [POST /master]
任意のユーザーのトークンを生成する
ヤベーやつ

+ Request

    + Headers

                Content-Type: application/json

    + Attributes
        
        + userId: `fmdisaoghewruialgrea`

+ Response 200 (application/json)

    + Attributes
        + message: `success` (string)
        + data (object)
            + token: `jwt-token` (string)
        + error: null (nullable)
