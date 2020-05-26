var newUsers = [
  {
        user: 'spoty',
        pwd: 'spotyapp2255world',
        roles: [
            {
                role: 'readWrite',
                db: 'spoty'
            }
        ]
    }
];

var currentUsers = db.getUsers();
if (currentUsers.length === newUsers.length) {
    quit();
}
db.dropAllUsers();

for (var i = 0, length = newUsers.length; i < length; ++i) {
    db.createUser(newUsers[i]);
}

var newCols= [            
    'users',
    'areas',
    'friendships',
]                                         
var currentCols = db.getCollectionNames();
if (currentCols.length === newCols.length) {
    quit();                      
}                                                         
