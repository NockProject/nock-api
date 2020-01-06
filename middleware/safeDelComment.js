const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

module.exports =  (req, res, next) => {
    console.log(req);

    Comment.findById({_id:req.params.id})
        .then((result) => {
            console.log(result._id);
            Post.updateMany({_id: result.postId},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            User.updateMany({_id: result.author},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    next();

};



