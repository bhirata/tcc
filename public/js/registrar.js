(function () {
    "use strict";

    var credentials = require('../../config/credentials.js');

    var peer_api_url = credentials.getCredentials("blockchain").peers[0].api_url;
    console.log(peer_api_url);
    peer_api_url = peer_api_url.replace("http", "https");
    console.log(peer_api_url);

    var users = credentials.getCredentials("blockchain").users;
    // console.log(users);

    var valid_users = [];
    users.forEach(function (user) {
        if(user.enrollId.indexOf("type1") >= 0){
            valid_users.push(user);

            var request = require("request");

            var options = { method: 'POST',
                url: [peer_api_url, "registrar"].join('/'),
                headers: {
                    'content-type': 'application/json'
                },
                body : { enrollId: user.enrollId, enrollSecret: user.enrollSecret },
                json: true
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
            });
        }

    });
    // console.log(valid_users);



    exports.teste1 = function (req, res) {
        return res.send(username);
    };

}());

// {"enrollId": user.enrollId,"enrollSecret": user.enrollSecret}
/*
O struct tem que ter o dinheiro

Transações terão o enrollId do destinatario e do remetente e o quanto de dinheiro será transicionado


 */