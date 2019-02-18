var mysql = require('mysql');
var con = mysql.createConnection(
{
    host: "127.0.0.1",
    user: "jesus",
    password: "jesus",
    database: "academia"
});

con.connect(function(err) 
{
    if (err) throw err;
});

module.exports = con;