# Group User

ユーザー関係のAPI

## get users [GET /user{?page,limit}]

spot情報以外のユーザー情報を返す

+ Parameters
   
    + page: `1` (optional, number) - page番号
    + limit: `10` (optional, number) - 1pageあたりの件数

+ Request

    + Headers

                x-access-token: jwt-token

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (object)
          + users (array[UserProfile])
        + error: null (nullable)


## get user info [GET /user/{userId}]

指定したユーザーのspot情報以外の情報を取得する

+ Parameters
    
    + userId: `fnwiiohasoflhdsaf` (optional, string)

+ Request

    + Headers

                x-access-token: jwt-token

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (object)
          + user (UserProfile)
        + error: null (nullable)

## register user [POST /user]

ユーザー登録用API
+ idNumStr : `additionalUserProfile.profile.id_str`

+ Request

    + Headers

                Content-Type: application/json

    + Attributes (RegisterBody)

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (RegisterRes)
        + error: null (nullable)

+ Response 400 (application/json)

    + Attributes(object)
        + message: `friend users number must be lower 70000` (string)
        + data: null (string)
        + error: 60002 (number)


## update email [PUT /user/email]


+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (object)

        + email: `hoge@google.com` (string)

+ Response 200 (application/json)

    + Attributes (ProbeRes)

## update notification [PUT /user/notification]
数字で通知の出し方を決定する
0: 通知無し
1: spot時にフォローしてる人に通知

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (object)

        + notification: `1` (number)

+ Response 200 (application/json)

    + Attributes (ProbeRes)

## post inquiry [POST /user/inquiry]
お問い合わせAPI

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (object)

        + subject: `subject` (string)
        + text: `問い合わせ内容` (string)

+ Response 200 (application/json)

    + Attributes (ProbeRes)

## update checkpoketime [PUT /user/checkpoketime]

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (object)

        + lastCheckPokeTime: `1` (number)

+ Response 200 (application/json)

    + Attributes (ProbeRes)
