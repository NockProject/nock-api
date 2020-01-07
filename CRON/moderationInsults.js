const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Building = require('../models/Building');
const User = require('../models/User');

const banList = 'fdp connard con salope pute';
const CronJob = require('cron').CronJob;

const safeDelComm = require('../middleware/functions/deleteOneComment');
const safeDelPost = require('../middleware/functions/deleteOnePost');



const job = new CronJob('00 00 00 * * *', function( next ) {
    console.log(" \n ----- MODERATION EN COURS ----- \n");

    Post.find({$text: {$search: banList}})
        .then((result) => {
            result.forEach(item => {
                safeDelPost(item.id, next);
                console.log("POST ID : " + item.id + " supprimés ! (Cause insulte)");
            });
            console.log('\n' + result.length + " Post(s) supprimé(s) avec succes \n");
        })
        .catch(error => console.log(error));

    Comment.find({$text: {$search: banList}})
        .then((result) => {
            result.forEach(item => {
                safeDelComm(item.id, next);
                console.log("COMMENTAIRE ID : " + item.id + " supprimés ! (Cause insulte)");
            });
            console.log('\n' + result.length + " Commentaire(s) supprimer avec succes \n");
        })
        .catch(error => console.log(error));

    console.log(" \n ----- MODERATION TERMINER ----- \n")


});
job.start();



