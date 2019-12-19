const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const  decodeToken = jwt.verify(token, process.env.TOKEN_ENCODE);
        const  userId = decodeToken.userId;
        const  isAdmin = decodeToken.isAdmin;
        if(req.body.userId && req.body.userId !== userId ){
            res.status(401).json({error: 'User ID non valable !'});
        }else{
            if(req.body.isAdmin && req.body.isAdmin !== true || isAdmin !== true){
                res.status(401).json({error: 'Vous n\'avez pas les droits d\'administration'});
            }else{
                next();
            }
        }
    }
    catch (error) {
        res.status(401).json({error: error| 'Requete non authentifiee !'});
    }
};
