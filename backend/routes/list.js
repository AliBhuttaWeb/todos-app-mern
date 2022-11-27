//Router for individuals route files
const express = require('express');
const router  = express.Router();

//Custom files/module exports
const Response       = require.main.require('./facades/response');
const ListController = require.main.require('./controllers/list_controller');

router.route('/').get(ListController.fetchList);
router.route('/').post(ListController.createList);
router.route('/').put(ListController.updateList);
router.route('/:id').get(ListController.fetchListById);
router.route('/:id').delete(ListController.deleteListById);

module.exports = router;