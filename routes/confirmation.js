
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.status(200).send({"message": "Hello API Event Received"});
};

