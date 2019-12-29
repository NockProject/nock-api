const Post = require('../models/Post');
const banList = ['fdp', 'connard', 'salope', 'pute'];

exports.moderatePost = (req, res) => {
    banList.forEach(nWord => {
        autoModeration(nWord)
    });
    res.status(200).json({ message: 'Moderation automatique effectuer !'})
};

function autoModeration (nWord){
    Post.find({$text: {$search: nWord}})
        .then(result => result.forEach(yop => {
            Post.deleteOne({_id: yop._id})
                .then(() => console.log('Post Id : '+  yop.id + ' deleted'))
                .catch(error => console.log(error));
        }))
        .catch(error => console.log(error));
}

exports.postsQuery = (req, res) => {
   Post.find({$text: {$search: req.params.query}})
        .then(result => res.status(200).json(result))
        .catch(error => res.status(404).json({error}));
};
