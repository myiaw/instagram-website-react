var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new Schema({
    'content': String,
    'postedBy': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'photoId': {
        type: Schema.Types.ObjectId,
        ref: 'photo'
    },
    'postedAt': {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comments', commentsSchema);
