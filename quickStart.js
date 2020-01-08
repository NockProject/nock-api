const userCtrl = require('./controllers/user');
const buildingCtrl = require('./controllers/building');
const postCtrl = require('./controllers/post');
const commCtrl = require('./controllers/comment');

const JsonBuilding = require('./quickJson/minBuilding.json');
const JsonUser = require('./quickJson/minUser.json');
const JsonPost_one = require('./quickJson/minPost_one.json');
const JsonPost_two = require('./quickJson/minPost_two.json');
const JsonComm = require('./quickJson/minComm.json');


function resolveAfter2MS() {
    return new Promise(resolve => {
        buildingCtrl.createBuilding(JsonBuilding);
        userCtrl.signUp(JsonUser);
        postCtrl.createPost(JsonPost_one);
        postCtrl.createPost(JsonPost_two);
        commCtrl.createComment(JsonComm);
        setTimeout(() => {
            resolve('resolved');
        }, 200);
    });
}

async function asyncCall() {
    await resolveAfter2MS();
    console.log(" \n \n ---- initialisation de la base terminer ------ \n \n ");
}

asyncCall();



