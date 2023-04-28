var UserModel = require('../models/userModel.js');
var PhotoModel = require('../models/photoModel.js');
const {Types} = require("mongoose");
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate('postedBy', 'username')
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
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
            //return res.redirect('/users/login');
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;
            user.email = req.body.email ? req.body.email : user.email;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showRegister: function (req, res) {
        res.render('user/register');
    },

    showLogin: function (req, res) {
        res.render('user/login');
    },

    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (err, user) {
            if (err || !user) {
                var err = new Error('Wrong username or paassword');
                err.status = 401;
                return next(err);
            }
            req.session.userId = user._id;
            //res.redirect('/users/profile');
            return res.json(user);
        });
    },

    profile: function (req, res, next) {
        UserModel.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error('Not authorized, go back!');
                        err.status = 400;
                        return next(err);
                    } else {
                        return res.json(user);
                    }
                }
            });
    },

    logout: function (req, res, next) {
        if (req.session) {
            // Destroy the session and clear the cookie
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.status(200).json({message: 'Logged out successfully'});
                }
            });
        } else {
            return res.status(200).json({message: 'Already logged out'});
        }
    },


    amountOfPosts: async function (req, res) {
        const id = req.session.userId;
        try {
            const amount = await PhotoModel.find({postedBy: id}).count();
            return res.status(201).json({amount: Number(amount)});
        } catch (e) {
            console.error('Error in amountOfPosts:', e);
            return res.status(500).json({
                message: 'Error when getting amount.',
                error: e
            });
        }
    },
    amountOfLikes: async function (req, res) {
        const id = req.session.userId;
        console.log('id', id);

        // Convert the string id to an ObjectId
        const objectId = Types.ObjectId(id);

        try {
            const result = await PhotoModel.aggregate([
                {$match: {postedBy: objectId}},
                {
                    $group: {
                        _id: "$postedBy",
                        totalLikes: {$sum: {$size: "$likes"}}
                    }
                }
            ]);
            console.log('result', result);
            const amount = result.length > 0 ? result[0].totalLikes : 0;
            return res.status(201).json({amount: Number(amount)});
        } catch (e) {
            console.error('Error in amountOfLikes:', e);
            return res.status(500).json({
                message: 'Error when getting amount.',
                error: e
            });
        }
    }


};
