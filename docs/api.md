HOST: https://apidev.spotyapp.jp/v1
# Spoty
API Docs for version 1

<!-- include(teapot.md) -->
<!-- include(login.md) -->
<!-- include(user.md) -->
<!-- include(area.md) -->
<!-- include(goal.md) -->
<!-- include(poke.md) -->
<!-- include(spot.md) -->



# Data Structures
## LoginRes (object)
+ token: `jwt-token` (string)
+ userId: `jlkwajngoehlglwag` (string)

## ProbeRes (object)
+ message: `success` (string)
+ data: null (nullable)
+ error: null

## AreaInfo (object)
+ areaId: `kljfg2wio0ut83029t` (string)
+ name: `渋谷` (string)
+ areaNum: 1 (number)
+ created: `123456789900` (number)
+ updated: `123456789900` (number)

## GoalInfo (object)
+ goalId: `kljfgwioaghewoihagew` (string)
+ name: `ご飯` (string)
+ goalNum: 1 (number)
+ created: `123456789900` (number)
+ updated: `123456789900` (number)

## UserProfile (object)
+ userId: `fdja908ohb2u4it3fgdsnigo` ... userId (string)
+ idNumStr: 402714679 (string) ... additionalUserInfo.profile.id_str 
+ displayName: `additionalUserInfo.profile.name` (string)
+ screenName: `additionalUserInfo.username` (string)
+ currentSpot (currentSpot)
+ icon: `OAuth時に貰えるiconURL` (string)
+ banner: `OAuthの時にもらえるbannerURL` (string)
+ twitterFriendsCount: 50 (number)
+ twitterFollowerCount: 100 (number)
+ lastPokedTime: 1234567890 (number)
+ lastCheckPokeTime: 1234567890 (number)

## currentSpot (object)
+ areaId: [`areaId`] (array[string]) 
+ goalId: [`goalId`] (array[string])
+ spotId: `ngkdlajshbuiahbjbraeb` (string)
+ expire: 1234567890 (number)
+ meet: false (boolean)
+ follow: false (boolean)

## RegisterBody (object)
+ firebaseUid: `firebaseからもらえるトークン(uid)` (string)
+ accessToken: `credential.accessToken` (string)
+ secret: `credential.secret` (string)
+ idNumStr: 402714679 (string) ... additionalUserInfo.profile.id_str 
+ displayName: `additionalUserInfo.profile.name` (string)
+ screenName: `additionalUserInfo.username` (string)
+ icon: `OAuth時に貰えるiconURL` (string)
+ banner: `OAuthの時にもらえるbannerURL` (string)
+ email: `neko@neko.com` (string)

## RegisterRes (object)
+ userId: `jaogslgheuisrldghreui` (string)
+ token: `jwt-token` (string)

## spotBody (object)
+ areaIds: [`areaId`] (array[string]) 
+ goalIds: [`goalId`] (array[string])
+ meet: false (boolean)
+ follow: false (boolean) 
+ page: `1` (optional, number) ... page番号
+ limit: `10` (optional, number) ... 1pageあたりの件数

## getSpot (object)
+ areaIds: [`actualareaId`] (optional, array[string]) - [areaId]
+ goalIds: [`actualgoalId`] (optional, array[string]) - [goalId]

## pokeBody (object)
+ targetId: `jfioahsgueiwag` (string) ... 相手のuserId

## pokeInfo (object)
+ pokeId: `fdja908ohb2u4it3fgdsnigo` ... pokeId (string)
+ userId: `gmnowkahgjnalgbja` (string) 
+ targetId: `vwnkoahvdunbailshga` (string)
+ spotId: `ngkdlajshbuiahbjbraeb` (string)
+ expire: 1234567890 (number)

## friendshipData (object)
+ relationship" (relationship)

## relationship (object)
+ target (target)
+ source (source)

## source (object)
+ can_dm: false
+ blocking: null
+ muting": null
+ id_str: "8649302"
+ all_replies: null
+ want_retweets: null
+ id: 8649302
+ marked_spam: null
+ screen_name: "Im_nuko"
+ following: false
+ followed_by: false
+ notifications_enabled: null

## target (object)
+ id_str: "12148"
+ id: 12148
+ screen_name: "moriyuu__"
+ following: false
+ followed_by: false

