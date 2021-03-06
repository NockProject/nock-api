const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
      const token = req.headers.authorization.split(' ')[1];
      const  decodeToken = jwt.verify(token, process.env.TOKEN_ENCODE);
      const  userId = decodeToken.userId;
      if(req.body.userId && req.body.userId !== userId){
          res.status(401).json({error: 'User ID non valable !'});
      }else{
          next();
      }
  }
  catch (error) {
      res.status(401).json({error: error| 'Requete non authentifiee !'});
  }
};
