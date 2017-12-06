var express=require('express'),
mysql=require('mysql'),
Promise = require('bluebird'),
using = Promise.using,
credentials=require('./credentials.json'),
app = express(),
port = process.env.PORT || 1337;

var connection = mysql.createConnection(credentials); // setup the connection

connection.connect(function(err){if(err){console.log(error)}});

app.use(express.static(__dirname + '/public'));
app.get("/buttons",function(req,res){
  var sql = 'SELECT * FROM fluto006.till_buttons';
  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an error:");
             console.log(err);}
     res.send(rows);
  }})(res));
});
app.get("/click",function(req,res){
  var id = req.param('id');
  var sql = 'YOUR SQL HERE'
  console.log("Attempting sql ->"+sql+"<-");

  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an insertion error:");
             console.log(err);}
     res.send(err); // Let the upstream guy know how it went
  }})(res));
});
// Your other API handlers go here!
app.get("/sale",function(req,res){
  var sql = 'CALL fluto006.completeTransaction';
  connection.query(sql, (function(res){return function(err,rows,fields){
    if(err){
	console.log("Error: couldn't complete transaction");
	console.log(err);
    } 
    res.send(rows);
    }})(res));	
});
app.get("/void",function(req,res){
  var sql = 'CALL fluto006.voidTransaction';
  connection.query(sql, (function(res){return function(err,rows,fields){
    if(err){
	console.log("Error: couldn't void transaction");
        console.log(err);
    }
    res.send(rows);
  }})(res));
});
app.get("/list",function(req,res){
  var sql = 'SELECT * FROM fluto006.current_transaction';
  connection.query(sql, (function(res){return function(err,rows,fields){
    if(err){
      console.log("Error: couldn't list transaction");
      console.log(err);
    }
    res.send(rows);
  }})(res));
});

app.listen(port);
