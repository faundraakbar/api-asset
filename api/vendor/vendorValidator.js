const {query, body, param, validationResult, header} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'vendor_post':{
            return [               
               body('nama').notEmpty().withMessage('Nama harus diinput')
            ]
        }
        case 'vendor_update':{
            return [
                param('id_vendor').notEmpty().withMessage('Harus mengirim ID Vendor').isUUID().withMessage('ID Vendor harus UUID')
            ]
        }
    }
    
}

exports.verify = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({
                errors:errors.array()
            })
            return;
        }else{
            return next();
        }
    }catch(err){
        return next(err);
    }
}