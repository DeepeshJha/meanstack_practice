const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema)



// const { createPool } = require('mysql');
// const parser = new (require('node-date-parser').default)();

// const pool = createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'password', 
//     database: 'todo',
//     dateStrings: 'date'
// })

// module.exports = pool;

// let todo = {name: "study ego is the enemy", created_at: new Date(), completed: false }
// pool.query(`insert into todolist set ?`,todo,(err,res) => {
//     if(err) throw err;
//     else console.log("results",res)
// })

// pool.query(`select * from todolist`,(err,res) => {
//     if(err) throw err;
//     else console.log("results",res)
// })

// const mysql = require('mysql')
// let mysqlCon = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password', 
//     database: 'todo',
//     dateStrings: 'date'
// })
// mysqlCon.connect((err) => {
//     if(!err) console.log("DB connection successful!")
//     else console.log("DB connection failed! ", JSON.stringify(err,undefined,2))
// })