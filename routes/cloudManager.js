/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
var projectId = "photosign-232002";
const storage = new Storage({projectId});

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

exports.getPictures = function(req, res){
  var email = "jasonleh99@gmail.com";
  const[pictures] = getPictures(email);
  
  pictures.forEach(picture =>{
    console.log(picture.description);
  })
  res.status(200).send(pictures);
}

exports.encodeImage = function(req, res){
  var path = "temp.jpg";
  var buffer = encodeBase64(path);
  console.log(buffer);

  res.status(200).send(buffer);
}

exports.newUser = function(req, res){
  var obj = req.body.obj;
  console.log(obj);

  createNewUser(obj).then(function(res){
    console.log("ran user");
  })
  .catch(function(err){
    console.log(err);
  });

  res.end();
}

exports.newPicture = function(req, res){
  var obj = req.body.obj;
  console.log(obj);

  uploadNewPicture(obj).then(function(res){
    console.log("ran pic");
  })
  .catch(function(err){
    console.log(err);
  });

  res.end();
}



async function createNewUser(jsonObject){
  //Creates local file
  console.log("creating user");
  var dictstring = JSON.stringify(jsonObject);
  var fs = require('fs');
  var email = jsonObject.email;
  fs.writeFile(email.hashCode() + ".json", dictstring, function(err){
  });

  //Uploads to gcps
  await storage.bucket("photosign").upload(email.hashCode() + ".json", {
    gzip: true,
    destination: "users/" + name + ".json",
    metadata: {
      cacheControl: 'no-cache'
    },
  })

  //Deletes the local file
  fs.unlink(email.hashCode() + ".json", function(err){
  });
}

async function uploadNewPicture(jsonObject){
  var obj = JSON.parse(jsonObject);
  var owner = obj.owner;
  var description = obj.description;
  console.log(owner + " | " + description);

  //Creates local file
  var dictstring = JSON.stringify(jsonObject);
  var fs = require('fs');
  fs.writeFile(owner.hashCode() + ".json", dictstring, function(err){
  });

  //Uploads to gcps
  await storage.bucket("photosign").upload(owner.hashCode() + ".json", {
    gzip: true,
    destination: "users/" + owner.hashCode() + "/" + description.hashCode() + ".json",
    metadata: {
      cacheControl: 'no-cache'
    },
  })

  //Deletes the local file
  fs.unlink(owner.hashCode() + ".json", function(err){
  });
}

async function findUser(email){
  $.get("https://www.googleapis.com/storage/v1/b/photosign/o/user/" + email.hashCode() + ".json", function(res){
    return res;
  })
}

async function getPictures(email){
  const [files] = await storage.bucket('photosign/user/' + email.hashCode() + '/').getFiles();

  return files;
}

function encodeBase64(path){
  var fs = require('fs');

  var bitmap = fs.readFileSync(path);
  return new Buffer(bitmap).toString('base64');
}

function decodeBase64(image64){
  var binaryData = new Buffer(image64, 'base64').toString('binary');

  var fs = require('fs');

  fs.writeFile("out.jpg", binaryData, "binary", function(err){
    console.log(err);
  });
}