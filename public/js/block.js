(function () {
   "use strict";

    var request = require("request");

    var credentials = require('../../config/credentials.js');

    var peer_api_url = credentials.getCredentials("blockchain").peers[0].api_url;
    peer_api_url = peer_api_url.replace("http", "https");

    exports.blocks = function (req, res) {
        var block = req.body.block;

        var options = { method: 'POST',
            url: [peer_api_url, "chain", "blocks", block].join('/'),
        };
        request(options, function (error, response, body) {
            if (error){
                console.log(body);
                res.status(400).send(error);
                throw new Error(error);
            }
            else if(body.Error){
                console.log(body);
                res.status(400).send(body);
            } else {
                console.log(body);
                res.send(body);
            }
        });
    }

}());