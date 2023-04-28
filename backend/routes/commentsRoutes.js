const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController.js');
const photoController = require('../controllers/photoController.js');

router.get('/', commentsController.list);

/*
 * GET
 */
router.get('/:id', photoController.getAllComments);

/*
 * POST
 */
router.post('/:id', commentsController.create);


router.put('/:id', commentsController.update);

/*
 * DELETE
 */
router.delete('/:id', commentsController.remove);

module.exports = router;
