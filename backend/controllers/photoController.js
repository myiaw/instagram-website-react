var PhotoModel = require('../models/photoModel.js');
var CommentsModel = require('../models/commentsModel.js');
const decay = require('decay');
/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */


    list: async function (req, res) {
        const score = decay.hackerHot();
        try {
            const photos = await PhotoModel.find().populate('postedBy', 'username').exec();
            photos.sort((a, b) => {
                const scoreA = score(a.views, a.postedAt);
                const scoreB = score(b.views, b.postedAt);
                return scoreB - scoreA;
            });

            return res.json(photos);
        } catch (err) {
            console.log('Error:', err);
            return res.status(500).json({
                message: 'Error when getting photo.',
                error: err
            });
        }
    },


    /**
     * photoController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate('postedBy', 'username')
            .populate('comments')
            .exec(function (err, photo) {

                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }


                return res.json(photo);
            });
    },


    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            name: req.body.name,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: [],
            reports: []
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */

    updateLikes: async function (req, res) {
        const photoId = req.params.id;
        const userId = req.session.userId;

        try {
            const updatedPhoto = await PhotoModel.findOneAndUpdate(
                {_id: photoId},
                {$addToSet: {likes: userId}},
                {new: true}
            );

            if (!updatedPhoto) {
                return res.status(404).json({message: 'No such photo'});
            }

            res.status(200).json({likes: updatedPhoto.likes.length});
        } catch (error) {
            console.error('Error while liking the photo:', error);
            res.status(500).json({message: 'Error while liking the photo', error});
        }
    },

    updateViews: function (req, res) {
        const id = req.params.id;
        PhotoModel.findOneAndUpdate({_id: id}, {$inc: {views: 1}}, {new: true}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    updateReports: async function (req, res) {
        const photoId = req.params.id;
        const userId = req.session.userId;

        try {
            const updatedPhoto = await PhotoModel.findOneAndUpdate(
                {_id: photoId},
                {$addToSet: {reports: userId}},
                {new: true}
            );

            if (!updatedPhoto) {
                return res.status(404).json({message: 'No such photo'});
            }

            res.status(200).json({reports: updatedPhoto.reports.length});
        } catch (error) {
            console.error('Error while liking the photo:', error);
            res.status(500).json({message: 'Error while liking the photo', error});
        }
    },


    update: function (req, res) {
        const id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    getAllComments: function (req, res) {
        const photoId = req.params.id;

        // Update this line to populate the comments with the postedBy object.
        CommentsModel.find({photoId: photoId})
            .populate('postedBy', 'username')
            .exec(function (err, comments) {

                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comments.',
                        error: err
                    });
                }

                if (!comments) {
                    return res.status(404).json({
                        message: 'No comments found'
                    });
                }

                return res.json(comments);
            });
    }
};
