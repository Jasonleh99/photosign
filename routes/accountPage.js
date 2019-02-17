// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
var projectId = "photosign-232002";
const storage = new Storage({projectId});

var currentUser = require("../currentUser.json");

exports.view = function(req, res) {
    res.render('accountPage');
};
//res has base 64 image
exports.saveImage = function(req, res){
  var json = {"owner": currentUser.email, "base64Image": req.body.base64Image};
    uploadNewPicture(json).then(function(ree){
  })
  .catch(function(err){
    console.log(err);
  })
}

async function uploadNewPicture(jsonObject){
  var owner = jsonObject["owner"];
  var base64Image = jsonObject["base64Image"];

  //Creates local file
  var dictstring = JSON.stringify(jsonObject);
  var fs = require('fs');
  fs.writeFile(owner.hashCode() + ".json", dictstring, function(err){
  });

  //Uploads to gcps
  await storage.bucket("photosign").upload(owner.hashCode() + ".json", {
    gzip: true,
    destination: "users/" + owner.hashCode() + "/" + base64Image.hashCode() + ".json",
    metadata: {
      cacheControl: 'no-cache'
    },
  })

  //deletes local file
  fs.unlink(owner.hashCode() + ".json", function(err){
  });
}