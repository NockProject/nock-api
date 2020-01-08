const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const User = require('../../models/User');

module.exports =  (id,next) => {
    Comment.findById({_id:id})
        .then((result) => {
            Post.updateMany({_id: result.postId},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            User.updateMany({_id: result.author},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Comment.deleteOne({_id: id })
                .then(() => next)
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};



