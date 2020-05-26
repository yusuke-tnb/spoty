# Group Poke

Poke関係のAPI

## Poke list [GET /poke{?page,limit}]

pokeリストを取得するAPI

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

## show friendship [GET /poke/show{?sourceUser,targetUser}]

pokeしようとする相手と自分の関係を取得するAPI

+ Parameters
   
    + sourceUser: `Im_nuko` (string) - pokeしようとしているユーザーのscreenName
    + targetUser: `moriyuu__` (string) - pokeされるユーザーのscreenName

+ Request

    + Headers

                x-access-token: jwt-token


+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (friendshipData)
        + error: null (nullable)

## post poke [POST /poke]

pokeするAPI

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (pokeBody)

+ Response 200 (application/json)

    + Attributes

        + message: `success` (string)
        + data: null (nullable)
        + error: null (nullable)
