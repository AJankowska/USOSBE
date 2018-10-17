var express = require('express');
var app = express();
var mongojs = require('mongojs');

var bodyParser = require('body-parser');
var credentials = require('credentials.js').credentials;
var db = mongojs('mongodb://' + credentials + '@ds237072.mlab.com:37072/simr');
var ObjectId = require('mongojs').ObjectID;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api',function(req,res){
    db.simr.find(function(err,simr){
        if(err) console.log(err);
        res.json(simr);
    });
});
app.get('/api/ECTS',function(req,res){
    db.ECTS.find(function(err,ECTS){
        if(err) console.log(err);
        res.json(ECTS);
    });
});
app.get('/api/:id',function(req,res){
    var id=req.params.id;
    db.simr.findOne({"_id":ObjectId(id)},function(err,simr){
        if(err) console.log(err);
        res.json(simr);
    });
});
app.put('/api/:id/:category/1',function(req,res){
    let id=req.params.id; 
    //res.send('dodano '+req.body)
    db.simr.findOneAndModify({"_id":ObjectId(id)},{$push: {"labNotatki" : req.body}},function(err,simr){
        if(err) console.log(err);
        console.log(JSON.stringify(simr));
        res.json(simr);
    });
    
    //db.simr.findOneAndUpdate({"_id":ObjectId(id)}, {$push: {"labNotatki" : req.body}});
}); 
app.delete('api/:id/:category/1',function(req,res){
    let id=req.params.id;
    let item = req.body;
    //db.simr.update({"_id":ObjectId(id)},{$pop:{req.params.category:item}});
    res.send('usunięto '+ req.body);
});  


app.listen(8082);