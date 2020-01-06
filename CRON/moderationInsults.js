const Post = require('../models/Post');
const banList = 'fdp connard salope pute';
const CronJob = require('cron').CronJob;

const job = new CronJob('* 2 * * * * *', function() {
    Post.deleteMany({$text: {$search: banList}})
        .then(() => console.log('Moderation automatique effectuer !'))
        .catch(error => console.log(error));
});
job.start();



