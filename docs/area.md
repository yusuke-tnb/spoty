# Group Area

エリア情報関係のAPI

## get Area info [GET /area/{areaId}]

指定したエリアのデータを返す

+ Parameters
    
    + areaId: `jfioewahg8302t23` (optional, string) - 指定が無ければ全てのエリアの情報を返します
      

+ Response 200 (application/json)

    + Attributes (object)
        + message: `success` (string)
        + data (object)
          + areas (array[AreaInfo])
        + error: null (nullable)
 
## post Area [GET /area]

エリアの追加API
本番環境ではマスターアカウント出来るまで叩けないようにする

+ Request
      
    + Headers

                Content-Type: application/json
    
    + Attributes 
    
        + name: `渋谷` (string) 
    

+ Response 200 (application/json)

    + Attributes (ProbeRes)
