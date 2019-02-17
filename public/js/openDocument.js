'use strict';

$(document).ready(function() {
    $('#open-doc-btn').click(function() {
        openDoc($('#form-embed-url').val());
    });

    $('#send-doc-btn').click(function(){
        $.post('/release-form', {"email": other.email}, function(err){
            
        });
    })
})

var clientID = '5c4de85db6346506547adfc62691f36f';

function openDoc(signURL){
    if(signURL.length > 0){
        HelloSign.init(clientID);
        HelloSign.open({
            url: signURL,
            allowCancel: true,
            skipDomainVerification: true,
            messageListener: function(eventData) {
                //("Got message data: " + JSON.stringify(eventData));
            
                if (eventData.event == HelloSign.EVENT_SIGNED) {
                    //do something for document getting signed
                }
                else if (eventData.event == HelloSign.EVENT_CANCELED) {
                    //do something else for document closing before getting signed
                }
                else if (eventData.event == HelloSign.EVENT_ERROR) {
                    //do something for an error situation
                }
                else if (eventData.event == HelloSign.EVENT_SENT) {
                    //not used in this example
                    //only used for embedded requesting
                }
            }
        });
    }
    else{
        console.log("invalid link");
    }
}