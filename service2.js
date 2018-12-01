var express = require('express');
var app = express();
//var mongojs = require('mongojs');
const mongoose = require('mongoose');
const SimrModel = require('./mongoSchema.js');
const ECTSModel = require('./ECTSSchema.js');
var bodyParser = require('body-parser');
const credentials = require('./credentials.js').credentials;
var db = 'mongodb://' + credentials + '@ds237072.mlab.com:37072/simr';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect(db, (err) => {
    console.log(err);
});
mongoose.promise = global.promise;
database = mongoose.connection;

app.get('/api', function (req, res) {
    SimrModel.find(function (err, simr) {
        if (err) console.log(err);
        res.json(simr);
    });
});
app.get('/api/ECTS', function (req, res) {
    ECTSModel.find(function (err, ECTS) {
        if (err) console.log(err);
        res.json(ECTS);
    });
});
app.get('/api/:id', function (req, res) {
    var id = req.params.id;
    SimrModel.findOne({
        "_id": mongoose.Types.ObjectId(id)
    }, function (err, simr) {
        if (err) console.log(err);
        res.json(simr);
    });
});
app.get('/api/editable/:id/:category', function (req, res) {
    let id = req.params.id;
    let category = req.params.category
    SimrModel.findOne({
        "_id": mongoose.Types.ObjectId(id)
    }, (err, subject) => {
        if (err) console.log(err);
        setTimeout(function () {
            res.json(subject[category]);
        }, 600);

    })
});
app.put('/api/:id/:category/1', function (req, res) {
    let id = req.params.id;
    let cat = req.params.category;

    //edytowanie
    //query zależne od tego co edytujemy
    //if(wyklad)...


});
app.put('/api/editable/:id/:category/save', function (req, res) {
    let id = req.params.id;
    let category = req.params.category;
    let item = req.body;
    console.log(JSON.stringify(item));
    console.log(category);
    SimrModel.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(id)
    }, {
        $set: {
            [category]: item
        }
    }, {
        new: true
    }, function (err, ress) {
        if (err) console.log(err);
        res.json(ress);
    })

});
app.put('/api/delete/:id/:category/:itemNo', function (req, res) {
    let id = req.params.id;
    let category = req.params.category;
    let itemNo = req.params.itemNo;
    let item = req.body;
    console.log(JSON.stringify(item));
    console.log(itemNo);
    console.log(category);
    SimrModel.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(id)
    }, {
        $pull: {
            [category]: {
                index: itemNo
            }
        }
    }, {
        new: true
    }, function (err, ress) {
        if (err) console.log(err);
        res.send(ress);
    })

});
// add wyk/lab/proj single element to subject
app.put('/api/add/:id/:category', function (req, res) {
    let id = req.params.id;
    let category = req.params.category;
    let item = req.body;
    SimrModel.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(id)
    }, {
        $push: {
            [category]: item
        }
    }, {
        upsert: true,
        new: true
    }, function (err, ress) {
        if (err) console.log(err);
        res.send(ress);
    })

});
app.put('/api/edit/:id/:category', (req, res) => {
    let id = req.params.id;
    let category = req.param.category;
    let item = req.body;
    SimrModel.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(id)
    }, {
        $set: {
            [category]: item
        }
    }, {
        upsert: true,
        new: true
    }, function (err, ress) {
        if (err) console.log(err);
        res.send(ress);
    })
})




app.listen(8082);