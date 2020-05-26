# Group Spot

スポット関係のAPI

## get spot [GET /spot{?page,limit}]

spotに一致する他の人のspot情報リストが返ります

+ Parameters
   
    + page: `1` (optional, number) - page番号
    + limit: `10` (optional, number) - 1pageあたりの件数

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token


+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (object)
          + users (array[UserProfile])
        + error: null (nullable)

## post spot [POST /spot]

spotするAPI
最後にspotしたもので上書きされます

spotに一致する他の人のspot情報リストが返ります

+ Request

    + Headers

                Content-Type: application/json
                x-access-token: jwt-token

    + Attributes (spotBody)

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data: null (nullable)
        + error: null (nullable)
