
const hellosign = require('hellosign-sdk')({ key: '5c06ce44f3fe798ba5cbfaae4ac8ddedc8b176a0a846b26e4b9513bb2c271b3e' });

var modelJson = require("./data/model.json");

var photographerJson = require("./data/photographer.json");

exports.form = function(req, res) {
  console.log(modelJson);
  sendForm(modelJson, photographerJson)
    .then(function(response){
      var signatureId = response.signature_request.signatures[0].signature_id;
      return hellosign.embedded.getSignUrl(signatureId);
    })
    .then(function(response){
        console.log(response + " | " + response.embedded.sign_url);
        url = response.embedded.sign_url;
        var promise = new Promise(function(resolve, reject){
          resolve(url);
        });
        res.json({"data": url});
    })
    .catch(function(err){
      console.log(err.message);
        //catch error
    });
};

var clientID = '5c4de85db6346506547adfc62691f36f';
var url = "";

function sendForm(photographerJson, modelJson){
  const opts = {
    test_mode: 1,
    clientId: clientID,
    template_id: '4257f240998e03da311bd0b600f2d09ce2780041',
    subject: 'Photo Release Form',
    message: 'Sign this form and we can start working together',
    signers: [
      {
        email_address: modelJson["email"],
        name: modelJson["name"],
        role: 'Model'
      }
    ],
    custom_fields: {
      photographerName: photographerJson["name"],
      modelName: modelJson["name"]
    }
  };
  return hellosign.signatureRequest.createEmbeddedWithTemplate(opts);
}