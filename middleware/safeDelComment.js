const safeDelOneComm = require('./functions/deleteOneComment');

module.exports =  (req, res, next) => {
    safeDelOneComm(req.params.id , next);

    res.status(200).json({ message: 'Objet supprime !'});

};



