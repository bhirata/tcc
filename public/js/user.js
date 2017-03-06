(function () {
    "use strict";

    var credentials = require('../../config/credentials.js');

    var username = credentials.getCredentials("cloudant").username;
    var pwd = credentials.getCredentials("cloudant").password;

    var cloudant = require('cloudant')({ account: username, password: pwd }).db.use('users');

    exports.insertUser = function (req, res) {

        console.log(req.body);

        // var params = {
        //     "username": req.body.username
        // };
        var params;

        if (req.body){
            console.log(req.body.username);
            params = {
                "username": req.body.username
            };
        }

        cloudant.insert(params, function (err, body) {
           if(err){
               return res.status(400).send({message: 'Failed to Insert Documents' + err.name + ' ' + err})
           } else {
               return res.send({message: 'User inserted'});
           }
        });
    };

    exports.getUser = function (req, res) {
        var id = req.body.id;
        var response;

        function get(uid) {
            return new Promise(function (resolve, reject) {
              cloudant.get(uid, function (err, body) {
                  if(!err){
                      resolve(body);
                  } else {
                      console.log("Deu ruim no getUser");
                      reject();
                  }
              });
            })
        }

        get(id).then(function (user) {
            console.log("get then");
            response = user;
            res.send(response)
        });
    };
    
    exports.getAllUsers = function (req, res) {
        cloudant.list({include_docs: true}, function (err, docs) {
            if(err){
                console.log('Failed to initialize Cloudant: ' + err.message);
                return res.status(400).send({message: 'Failed to initialize Cloudant: ' + err.message})
            }
            else{
                console.log('request on cloudant.js _all_docs');
                return res.send(docs.rows);
            }
        });
    }


}());