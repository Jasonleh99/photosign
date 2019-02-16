<script type="text/javascript" src="https://s3.amazonaws.com/cdn.hellosign.com/public/js/hellosign-embedded.LATEST.min.js"></script>
const hellosign = require('hellosign-sdk')({ key: '5c06ce44f3fe798ba5cbfaae4ac8ddedc8b176a0a846b26e4b9513bb2c271b3e' });
var clientID = '5c4de85db6346506547adfc62691f36f';

function sendForm(photographerJson, modelJson){
  var photographer = JSON.parse(photographerJson);
  var model = JSON.parse(modelJson);
  
  const opts = {
    test_mode: 1,
    clientId: clientID,
    template_id: 'd62fed03f30e627c25e1b567e459d4df92a54557',
    subject: 'Photo Release Form',
    message: 'Sign this form and we can start working together',
    signers: [
      {
        email_address: model["email"],
        name: model["name"],
        role: 'Model'
      }
    ],
    custom_fields: {
      locationAddress: '13252 silly street',
      photographerName: photographer["name"],
      modelName: model["name"]
    }
  };

  hellosign.signatureRequest.createEmbedded(opts).then((res) => {
    const signature = res.signature_request.signatures[0];
    const signatureId = signature.signature_id;
  
    return hellosign.embedded.getSignUrl(signatureId);
  }).then((res) => {
    console.log('The sign url: ' + res.embedded.sign_url);
  }).catch((err) => {
    // handle error
  });
}

function openDoc(signURL){
  HelloSign.init(clientID);
  HelloSign.open({
      url: signURL,
      allowCancel: true,
      messageListener: function(eventData) {

      }
  });
}

