var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');
var commentsRoutes = require('./commentsRoutes');

function requiresLogin(req, res, next) {
    console.log("Session:", req.session); // Add this line to log session object
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).json({message: "You must be logged in to view this page"});
    }
}


router.put('/:id/view', photoController.updateViews);
router.get('/', photoController.list);
//router.get('/publish', requiresLogin, photoController.publish);
router.get('/:id', photoController.show);


router.post('/', requiresLogin, upload.single('image'), photoController.create);

router.put('/:id/like', requiresLogin, photoController.updateLikes);

router.put('/:id/report', requiresLogin, photoController.updateReports);

router.put('/:id', photoController.update);

router.delete('/:id', photoController.remove);

module.exports = router;
