# Group Goal

目的情報関係のAPI

## get Goal info [GET /goal/{goalId}]

指定した目的のデータを返す

+ Parameters
    
    + goalId: `nveiwoagheruwagi` (optional, string) - 指定が無ければ全てのgoalの情報を返します
      

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (object)
          + goals(array[GoalInfo])
        + error: null (nullable)

## post Goal [POST /goal]

エリアの追加API
本番環境ではマスターアカウント出来るまで叩けないようにする

+ Request
      
    + Headers

                Content-Type: application/json
    
    + Attributes 
    
        + name: `出会い` (string) 
    

+ Response 200 (application/json)

    + Attributes (ProbeRes)
