const User = require('../../models/User');
const Building = require('../../models/Building');

const safeDelOnePost = require('../functions/deleteOnePost');

module.exports =  (id, next) => {
    Building.findById(id)
        .then((result) => {
            result.posts.forEach(item => {
                safeDelOnePost(item,next);
            });

            result.residents.forEach(item => {
                User.updateOne({_id: item},{ $unset: { buildingId: "" } })
                    .then(() => next)
                    .catch(error => console.log(error));
            });

            Building.deleteOne({_id: id })
                .then(() => next)
                .catch(error => console.log(error));

        })
        .catch(error => console.log(error));
};
