var mongoose = require('mongoose');
var ECTSSchema = new mongoose.Schema({
    allECTS:{
        type: Number
    },
    yourECTS:{
        type: Number
    },
    passingECTS:{
        type: Number
    }
})
var ECTS = mongoose.model('ECTS',ECTSSchema,'ECTS');
module.exports = ECTS;