const Building = require('../models/Building');

exports.createBuilding = (req, res, next) => {
    const building = new Building({
        ...req.body
    });
    building.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteBuilding =  (req, res, next) => {
    Building.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprime !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.updateBuilding = (req,res,next) => {
    Building.updateOne({_id: req.params.id },
        { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifie !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBuilding = (req, res, next)=>{
    Building.findOne({_id: req.params.id})
        .then(building => res.status(200).json(building))
        .catch(error => res.status(404).json({error}));
};

exports.getAllBuilding =  (req, res, next) => {
    Building.find()
        .then(buildings => res.status(200).json(buildings))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllBuildingWithPosts = (req,res,next) => {
    Building.findOne({_id: req.params.id})
        .populate('posts').exec()
        .then((posts) => res.status(200).json({feed: posts}))
        .catch(error => res.status(500).json({ error }));
};
