
/*
 * Callback handling for signatures.
 */

exports.view = function(req, res, json){
  var data = req.body.json;
    data = JSON.parse(data);
    data = data.event;
    console.log("Input payload of the event-----",data);
    var apiKey = '5c06ce44f3fe798ba5cbfaae4ac8ddedc8b176a0a846b26e4b9513bb2c271b3e';
    var calculate_hash = crypto.createHmac('sha256', apiKey).update(data.event_time + data.event_type).digest('hex').toString();
    var event_hash = data.event_hash;
    if(calculate_hash==event_hash){
        res.status(200).send('Hello API Event Received');
    }else{
        res.status(404).end();
    }
}