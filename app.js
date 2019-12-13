require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Things');
const Post = require('./models/Posts');

mongoose.connect(process.env.DB_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req,res,next) => {
    Thing.updateOne({_id: req.params.id },
        { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifie !'}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next)=>{
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});










app.post('/api/post', (req, res, next) => {

    const post = new Post({
        ...req.body
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/post/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/post/:id', (req,res,next) => {
    Post.updateOne({_id: req.params.id },
        { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifie !'}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/post/:id', (req, res, next)=>{
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}));
});

app.get('/api/post', (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
});












module.exports = app;
