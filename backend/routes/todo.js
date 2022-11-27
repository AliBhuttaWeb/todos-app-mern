//Router for individuals route files
const express = require('express');
const router = express.Router();

//Custom files/module exports
const Response = require.main.require('./facades/response');

router.route('/').get((req, resp) => {
    return resp.send("Todos will be showing here");
});

module.exports = router;