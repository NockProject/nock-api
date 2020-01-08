const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Building = require('../../models/Building');


const safeDelOneComm = require('../functions/deleteOneComment');

module.exports =  (id, next) => {

    Post.findById({_id: id})
        .then((result) => {
            User.updateMany({_id: result.author},{$pull: {posts: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Building.updateOne({_id: result.buildingId},{$pull: {posts: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Comment.find({postId : result._id})
                .then(result => result.forEach(item => {
                    safeDelOneComm(item._id , next);
                }))
                .catch(error => console.log(error));

            Post.deleteOne({_id: id })
                .then(() => next)
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};
