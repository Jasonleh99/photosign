var currentUser = require('../currentUser.json');

var partnerUser = require('../partnerUser.json');

exports.view = function(req, res) {
    res.render('messages');
};

exports.getSelf = function(req, res){
    var json = {"name": currentUser.name, "email": currentUser.email};
    res.send(json);
};

exports.getPartner = function(req, res){
    var json = {"name": partnerUser.name, "email": partnerUser.email};
    res.send(json);
}

exports.updatePartner = function(req, res) {
    partnerUser.name = req.body.name;
    partnerUser.email = req.body.email;
    res.end();
}