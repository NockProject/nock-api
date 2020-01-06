const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Building = require('../models/Building');
const User = require('../models/User');

const banList = 'fdp connard con salope pute';
const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * * * *', function( next ) {
    Post.find({$text: {$search: banList}})
        .then((result) => {
            User.updateMany({_id: result.author},{$pull: {posts: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Comment.deleteMany({postId : result._id})
                .then(() => next)
                .catch(error => console.log(error));

            Building.updateMany({_id: result.buildingId},{$pull: {posts: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Post.deleteMany({$text: {$search: banList}})
                .then((result) => console.log( result.deletedCount +' Posts supprimer ! cause haine'))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    Comment.find({$text: {$search: banList}})
        .then((result) => {
            Post.updateMany({_id: result.postId},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            User.updateMany({_id: result.author},{$pull: {comments: result._id}})
                .then(() => next)
                .catch(error => console.log(error));

            Comment.deleteMany({$text: {$search: banList}})
                .then((result) => console.log( result.deletedCount +' Commentaires supprimer ! cause haine'))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));


});
job.start();



