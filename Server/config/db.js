const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "bm8tvioh4lqlmcpsh44j-mysql.services.clever-cloud.com",
    user: "ulq9b1tew4cq1xgl",
    password: "o0fFMHZX4QohlKpkBdSX",
    database: "bm8tvioh4lqlmcpsh44j",
    timezone: 'UTC',
    flags: ['--max_allowed_packet=64M']
});
conn.connect(function (err){
    if(err) throw err;
    console.log("Connected To Database :)");
});

module.exports = conn;