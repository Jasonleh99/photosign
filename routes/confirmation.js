
/*
 * GET home page.
 */

exports.view = function(req, res,json){
  var data = req.body.json;
  console.log("Input payload of the event-----",data);
  res.status(200).send('Hello API Event Received');
}