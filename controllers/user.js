const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const User = require('../models/User');
const Building = require('../models/Building');

const safeDelOneUser = require('../middleware/functions/deleteOneUser');

exports.signUp = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                ...req.body,
                email: req.body.email,
                password: hash
            });
            User.save()
                .then(() => next)
                .catch(() => next);

            Building.updateOne({ _id: user.buildingId._id },
                { $push: { residents: user }})
                .then(() => res.status(201).json({ message: 'Utilisateur cree !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch( error => res.send(500).json({error}))
};

exports.login = (req, res) =>{
    User.findOne({ email: req.body.email })
        .then(user=>{
            if(!user){
                return res.status(401).json({ error: "Utilisateur non trouve !"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(401).json({ error: "Mot de passe incorrect !"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        buildingId: user.buildingId,
                        token: jwt.sign(
                            { userId: user._id, isAdmin: user.isAdmin},
                            process.env.TOKEN_ENCODE,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.safeDeleteUser =  (req, res, next) => {
    safeDelOneUser(req.params.id , next);
    res.status(200).json({ message: 'Objet supprime !'});
};

exports.getOneUser = (req, res)=>{
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));
};

exports.getAllUsers =  (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.updateUser = (req,res) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            User.updateOne({_id: req.params.id },
                { ...req.body, _id: req.params.id, password: hash})
                .then(() => res.status(200).json({message: 'Objet modifie !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUserWithPosts = (req,res) => {
    User.findOne({_id: req.params.id})
        .populate('posts').exec()
        .then((posts) => res.status(200).json({written: posts}))
        .catch(error => res.status(500).json({ error }));
};

exports.getUserWithComments = (req,res) => {
    User.findOne({_id: req.params.id})
        .populate('comments').exec()
        .then((comments) => res.status(200).json({written: comments}))
        .catch(error => res.status(500).json({ error }));
};
