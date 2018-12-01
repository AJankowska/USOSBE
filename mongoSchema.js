var mongoose = require('mongoose');

var SimrSchema = new mongoose.Schema({
  name: {
    type: String
  },
  ects: {
    type: Number
  },
  zaliczone: {
      type:Boolean
  }, 
  laborki: {
    type:Array
  },
  labNotatki: {
    type:Array
  },
  labZaliczenie: {
    type:Boolean
},
wyklad: {
    type:Array
  },
  wNotatki: {
    type:Array
  },
  wZaliczenie: {
    type:Boolean
},
projekt: {
    type:Array
  },
  pNotatki: {
    type:Array
  },
  pZaliczenie: {
    type:Boolean
},
cwiczenia: {
    type:Array
  },
  cwNotatki: {
    type:Array
  },
  cwZaliczenie: {
    type:Boolean
}



  

});


var Simr = mongoose.model('Simr', SimrSchema, 'simr');
module.exports = Simr;