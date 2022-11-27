const express = require('express');
const router  = express.Router();

//Custom modules
const Response         = require.main.require('./facades/response');
const ResponseCode     = require.main.require('./constants/response_codes');
const ResponseMessages = require.main.require('./constants/response_messages');

router.route('*').all((req, resp) => {
    const code    = ResponseCode.NOT_FOUND;
    const message = ResponseMessages.ROUTE_NOT_FOUND;

    return resp.json(Response.error(message, code));
});

module.exports = router;