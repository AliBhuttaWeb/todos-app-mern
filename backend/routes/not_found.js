const express = require('express');
const router  = express.Router();

//Custom modules
const RouteNotFoundController = require.main.require('./controllers/route_not_found_controller');

//Routes
router.route('*').all(RouteNotFoundController.routeNotFound);

module.exports = router;