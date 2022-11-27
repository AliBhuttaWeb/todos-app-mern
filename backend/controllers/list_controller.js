
//Custom imports
const List = require.main.require('./database/models/list');
const Response = require.main.require('./facades/response');
const ResponseMessages = require.main.require('./constants/response_messages');
const ResponseCodes = require.main.require('./constants/response_codes');

exports.fetchList = async(req, resp) => {
    try{
        const lists = await List.findAll();

        const msg = '';
        const data = lists;

        return resp.json(Response.success(msg, data));
    }catch($ex){
        return resp.json(Response.error());
    }
}

exports.createList = async(req, resp) => {
    try{
        const { name } = req.body;
        if(!name){
            let errors = {};
            const code = ResponseCodes.BAD_REQUEST;
            const msg  = ResponseMessages.VALIDATION_FAILED;
            errors['name'] = ResponseMessages.NAME_REQURIED;
            
            return resp.json(Response.error(msg, code, errors));
        }

        const list = await List.create({
            name
        });

        const msg  = ResponseMessages.LIST_CREATED_SUCCESS;
        const data = list;
        const code = ResponseCodes.RESOURCE_CREATED;

        return resp.json(Response.success(msg, data, code));
    }catch($ex){
        return resp.json(Response.error());
    }
}

exports.updateList = async(req, resp) => {
    try{
        const { id, name } = req.body;
        let validationError = false;
        let errors = {};

        if(!id){
            validationError = true;
            errors['id'] = ResponseMessages.ID_REQURIED;
        }

        if(!name){
            validationError = true;
            errors['name'] = ResponseMessages.NAME_REQURIED;
        }

        if(validationError){
            const code = ResponseCodes.BAD_REQUEST;
            const msg  = ResponseMessages.VALIDATION_FAILED;
            return resp.json(Response.error(msg, code, errors));
        }

        if(!await listFound(id)){
            const code = ResponseCodes.NOT_FOUND;
            const msg  = ResponseMessages.LIST_NOT_FOUND;
            return resp.json(Response.error(msg, code));
        }

        await List.update(
            { name },
            { where: { id } }
        );

        const msg  = ResponseMessages.LIST_UPDATED_SUCCESS;
        const data = '';
        const code = ResponseCodes.RESOURCE_UPDATED;

        return resp.json(Response.success(msg, data, code));
    }catch($ex){
        return resp.json(Response.error());
    }
}

exports.fetchListById = async(req, resp) => {
    try{
        const { id } = req.params;
       
        if(!id){
            let errors = [];
            errors['id'] = ResponseMessages.ID_REQURIED;
            const code = ResponseCodes.BAD_REQUEST;
            const msg  = ResponseMessages.VALIDATION_FAILED;

            return resp.json(Response.error(msg, code, errors));
        }

        const list = await listFound(id);

        if(!list){
            const code = ResponseCodes.NOT_FOUND;
            const msg  = ResponseMessages.LIST_NOT_FOUND;
            return resp.json(Response.error(msg, code));
        }
        const msg = '';
        const data = list;

        return resp.json(Response.success(msg, data));
    }catch($ex){
        return resp.json(Response.error());
    }
}

exports.deleteListById = async(req, resp) => {
    try{
        const { id } = req.params;
       
        if(!id){
            let errors = [];
            errors['id'] = ResponseMessages.ID_REQURIED;
            const code = ResponseCodes.BAD_REQUEST;
            const msg  = ResponseMessages.VALIDATION_FAILED;

            return resp.json(Response.error(msg, code, errors));
        }

        if(!await listFound(id)){
            const code = ResponseCodes.NOT_FOUND;
            const msg  = ResponseMessages.LIST_NOT_FOUND;
            return resp.json(Response.error(msg, code));
        }
        
        const deleted = await List.destroy(
            { 
                where: { id }
            }
        );
     
        const msg = ResponseMessages.LIST_DELETED_SUCCESS;

        return resp.json(Response.success(msg));
    }catch($ex){
        return resp.json(Response.error());
    }
}

const listFound = exports.listFound = async( id ) => {
    try{
        const list = await List.findOne(
        {
            where: { id } 
        }
    )
    return list;
    }catch($ex){
        return false;
    }
}