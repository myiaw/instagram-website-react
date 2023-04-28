var CommentsModel = require('../models/commentsModel.js');
var PhotoModel = require('../models/photoModel.js');
/**
 * commentsController.js
 *
 * @description :: Server-side logic for managing commentss.
 */
module.exports = {

    /**
     * commentsController.list()
     */
    list: function (req, res) {
        CommentsModel.find(function (err, commentss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }

            return res.json(commentss);
        });
    },

    /**
     * commentsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentsModel.findOne({_id: id}, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }

            if (!comments) {
                return res.status(404).json({
                    message: 'No such comments'
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentsController.create()
     */
    /**
     * commentsController.create()
     */
    create: function (req, res) {
        var id = req.params.id; // use the id param instead of photoId
        console.log('photoId:', id); // Log the photoId
        var comments = new CommentsModel({
            content: req.body.content,
            postedBy: req.session.userId,
            postedAt: req.body.postedAt,
            photoId: id,
        });

        comments.save(function (err, comments) {
            if (err) {
                console.log('Error:', err); // Log the error
                return res.status(500).json({
                    message: 'Error when creating comments',
                    error: err
                });
            }

            // push the new comment into the photo's comments array
            PhotoModel.findByIdAndUpdate(id, {$push: {comments: comments._id}}, {new: true}, function (err, photo) {
                if (err) {
                    console.log('Error:', err); // Log the error
                    return res.status(500).json({
                        message: 'Error when updating photo',
                        error: err
                    });
                }

                console.log('Comment saved:', comments); // Log the saved comment
                return res.status(201).json(comments);
            });
        });
    },


    /**
     * commentsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentsModel.findOne({_id: id}, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments',
                    error: err
                });
            }

            if (!comments) {
                return res.status(404).json({
                    message: 'No such comments'
                });
            }

            comments.content = req.body.content ? req.body.content : comments.content;
            comments.postedBy = req.body.postedBy ? req.body.postedBy : comments.postedBy;
            comments.postedAt = req.body.postedAt ? req.body.postedAt : comments.postedAt;

            comments.save(function (err, comments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comments.',
                        error: err
                    });
                }

                return res.json(comments);
            });
        });
    },

    /**
     * commentsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentsModel.findByIdAndRemove(id, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comments.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
