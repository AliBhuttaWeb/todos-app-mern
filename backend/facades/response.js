const ResponseCode = require.main.require('./constants/response_codes');
const ResponseData = require.main.require('./constants/response_data');
const ResponseMessages =  require.main.require('./constants/response_messages');

class Response {

    /**
     * Defining overall response node that will be used in every response
     * code: This defines the 'http code'
     * data: This defines 'data' of the response
     * message: This defines 'message' that we want to send to response
     * isError: This defines if there is any kind of error in response
     * errors: If there are more than one errors then this node will be used e.g in case of validation errors there can be more than 1 error in that case this can be useful
     */
    static code     = ResponseCode.SUCESS;
    static data     = ResponseData.EMPTY;
    static message  = '';
    static isError  = false;
    static errors   = [];

    /**
     * This method will clear the reponse before creating new one
     */
    static clearResponse = () => {
        this.code     = ResponseCode.SUCESS;
        this.data     = ResponseData.EMPTY;
        this.message  = '';
        this.isError  = false;
        this.errors   = [];
    }

    /**
     * This method is responsible to send response with every necessary node
     */
    static response = () => {
        return { 
            code:    this.code,
            message: this.message,
            data:    this.data,
            isError: this.isError,
            erros:   this.errors
        };
    }

     /**
     * This method will be used in case of success response, it receives 2 params that are optional
     * message: This defines 'message' that we want to send to response
     * data: This defines 'data' of the response
     */
    static success = (msg = null, data = null, code = null) => {
        this.clearResponse();
        
        this.message = msg ? msg : '';
        this.data = data ? data : ResponseData.EMPTY;
        this.code = code ? code : ResponseCode.SUCESS;

        return this.response();
    }

    /**
     * This method will be used in case of success response, it receives 2 params that are optional
     * message: This defines 'message' that we want to send to response
     * code: This defines the 'http code'
     */
    static error = (msg = null, code = null, errors = null) => {
        this.clearResponse();

        this.isError = true;
        this.message = msg ? msg : ResponseMessages.SERVER_SIDE_ERROR;
        this.code    = code ? code : ResponseCode.SERVER_ERROR;
        this.errors  = errors ? errors : [];
        
        return this.response();
    }
}

module.exports = Response;