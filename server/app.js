const express = require('express');
var mysql = require('mysql');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// const mongoose = require('mongoose');
const cors = require('cors');
//create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'citrus',
    database: 'db_sample'
});

// db.connect((err) => {
// if(err){
//     throw err;
// }
// console.log("Mysql Connected");
// });
db.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    db.query("SELECT * FROM books", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    db.query("SELECT * FROM authors", function (err, result1, fields) {
        if (err) throw err;
        console.log(result1);
      });
      db.query("SELECT * FROM topics", function (err, result2, fields) {
        if (err) throw err;
        console.log(result2);
      });
  });


const app = express();

//create db
// app.get('/createdb', (req, res) => {

// });

app.use(cors());
//connect to mlabdatabase
// mongoose.connect('mongodb://nitha:test123@ds149865.mlab.com:49865/gql-ninja');
// mongoose.connection.once('open', () => {
//     console.log("connected to database");
// })
//connect to mlabdatabase



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));
app.listen(4000, () => {
    console.log('Now Listening for request on port 4000');
});



