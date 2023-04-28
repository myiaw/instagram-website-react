var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    'name': String,
    'path': String,
    'postedBy': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'views': Number,
    'likes': [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    'postedAt': {
        type: Date,
        default: Date.now
    },
    'comments': [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    'reports': [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]

});

module.exports = mongoose.model('photo', photoSchema);
