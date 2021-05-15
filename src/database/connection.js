const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'01251903',
    database: 'persona'
});

mysqlConnection.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('DB is Conneted');
    }
});

module.exports = mysqlConnection;

