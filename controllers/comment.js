const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        ...req.body
    });
    comment.save()
        .then(() => next())
        .catch(error => res.status(400).json({ error }));

    User.updateOne({ _id: comment.author._id },
        { $push: { comments: comment }})
        .then(() => next())
        .catch(error => res.status(400).json({ error }));

    Post.updateOne({ _id: comment.postId._id },
        { $push: { comments: comment }})
        .then(() => next())
        .catch(error => res.status(400).json({ error }));

    res.status(201).json({ message: 'Objet enregistré !'})

};

exports.deleteComment =  (req, res) => {
    Comment.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.updateComment = (req,res) => {
    Comment.updateOne({_id: req.params.id },
        { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifie !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res)=>{
    Comment.findOne({_id: req.params.id})
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({error}));
};

exports.getAllComments =  (req, res) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
