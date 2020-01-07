const User = require('../../models/User');
const Building = require('../../models/Building');


const safeDelOneComm = require('../functions/deleteOneComment');
const safeDelOnePost = require('../functions/deleteOnePost');



module.exports =  (id, next) => {
    User.findById(id)
        .then((result) => {
            result.comments.forEach(item => {
                safeDelOneComm(item,next);
            });
            result.posts.forEach(item => {
                safeDelOnePost(item,next);
            });
            Building.updateMany({_id: result.buildingId},{$pull: {residents: result.id}})
                .then(() => next)
                .catch(error => console.log(error));
            next();
        })
        .catch(error => console.log(error));

    User.deleteOne({_id: id })
        .then(() => next)
        .catch(error => console.log(error));
};

