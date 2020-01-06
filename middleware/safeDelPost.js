const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Building = require('../models/Building');

module.exports =  (req, res, next) => {

    Post.findById({_id: req.params.id})
        .then((result) => {
            User.updateMany({_id: result.author},{$pull: {posts: req.params.id}})
                .then(() => next)
                .catch(error => console.log(error));

            Building.updateOne({_id: result.buildingId},{$pull: {posts: req.params.id}})
                .then((hi) => console.log(hi), next)
                .catch(error => console.log(error));

            Comment.find({postId : result._id})
                .then(result => result.forEach(item => {
                    Comment.findById({_id:item._id})
                        .then((comm) => {
                            Post.updateMany({_id: comm.postId},{$pull: {comments: comm._id}})
                                .then(() => next)
                                .catch(error => console.log(error));

                            User.updateMany({_id: comm.author},{$pull: {comments: comm._id}})
                                .then(() => next)
                                .catch(error => console.log(error));

                        })
                        .catch(error => console.log(error));

                    Comment.deleteMany({postId : result._id})
                        .then(() => next)
                        .catch(error => console.log(error));
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => console.log(error));

    next();

};
