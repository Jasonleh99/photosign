var currUser = require("../currentUser.json");

const {Storage} = require('@google-cloud/storage');

var projectId = "photosign-232002";
const storage = new Storage({projectId});

exports.view = function(req, res) {
    res.render('signup');
};

exports.update = function(req, res) {
    var newUser = {
        "name": req.body.name,
        "email": req.body.email,
    };

    currUser.email = newUser.email;
    currUser.name = newUser.name;
    console.log(currUser);
    createNewUser(newUser).then(function(ree){
    })
    .catch(function(err){
        console.log(err);
    })
    
    res.end();
}

async function createNewUser(jsonObject){
    //Creates local file
    var dictstring = JSON.stringify(jsonObject);
    var fs = require('fs');
    var email = jsonObject.email;
    fs.writeFile(email.hashCode() + ".json", dictstring, function(err){
    });
  
    //Uploads to gcps
    await storage.bucket("photosign").upload(email.hashCode() + ".json", {
      gzip: true,
      destination: "users/" + email.hashCode() + ".json",
      metadata: {
        cacheControl: 'no-cache'
      },
    })
  
    //Deletes the local file
    fs.unlink(email.hashCode() + ".json", function(err){
    });
  }