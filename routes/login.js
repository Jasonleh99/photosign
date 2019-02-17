var currUser = require("../currentUser.json");

const {Storage} = require('@google-cloud/storage');

var projectId = "photosign-232002";
const storage = new Storage({projectId});

exports.view = function(req, res) {
    res.render('login');
};

exports.update = function(req, res) {
    var newUser = {
        "name": "Bob Jones",
        "email": req.body.email,
    };

    findUser(newUser.email).then(function(ree){
            var json = require("./data/" + newUser.email.hashCode() + ".json");
            currUser.email = json.email;
            currUser.name = json.name;
            var fs = require('fs');
            fs.unlink("./routes/data/" + newUser.email.hashCode() + ".json", function(err){
                
            });

            res.end();
        })
        .catch(function(err){
            console.log(err);
            currUser.user.push(newUser);
            createNewUser(newUser).then(function(res){
                console.log("Created new file");
            })
            .catch(function(err){
                console.log(err);
            });
            res.end();
        });
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

  async function findUser(email){
    const options = {
        destination: "./routes/data/" + email.hashCode() + ".json"
    }
    return await storage.bucket('photosign').file("users/" + email.hashCode() + ".json").download(options);
  }