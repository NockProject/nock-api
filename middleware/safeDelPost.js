const safeDelOnePost = require('./functions/deleteOnePost');

module.exports =  (req, res, next) => {
    safeDelOnePost(req.params.id , next);

    res.status(200).json({ message: 'Objet supprime !'});
};
