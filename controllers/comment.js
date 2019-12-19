const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        ...req.body
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment =  (req, res, next) => {
    Comment.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.updateComment = (req,res,next) => {
    Comment.updateOne({_id: req.params.id },
        { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifie !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next)=>{
    Comment.findOne({_id: req.params.id})
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({error}));
};

exports.getAllComments =  (req, res, next) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
