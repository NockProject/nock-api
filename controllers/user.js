const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const User = require('../models/User');

exports.signUp = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur cree !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) =>{
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
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_ENCODE,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next)=>{
    User.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
};

exports.getAllUsers =  (req, res, next) => {
    User.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

exports.updateUser = (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            User.updateOne({_id: req.params.id },
                { ...req.body, _id: req.params.id, password: hash})
                .then(() => res.status(200).json({message: 'Objet modifie !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
