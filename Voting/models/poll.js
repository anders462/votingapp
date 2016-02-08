'use strict';

var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;

var Poll = new Schema({
    pollname: String,
    username: String,
    options: [{no: Number, optionName: String, count: Number}],
    created:{ type: Date, default: Date.now }
});
// Automatically creates id with inc counter
Poll.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Poll', Poll);
