/**
 * Created by Bruno Hirata on 03/01/17.
 */


(function () {
    "use strict";

    var vcapServices = require( 'vcap_services' );
    var localEnv = {};
    var localJson = {};
    var cloudantCredentials = {};
    var blockchainCredentials = {};

    try {
        cloudantCredentials = vcapServices.getCredentials('cloudantNoSQLDB');
    } catch (e) {
        console.log('Running local...');
    }

    if (Object.keys(cloudantCredentials).length === 0) {
        localEnv = require('node-env-file')(__dirname + '/.env', {raise: false});

        cloudantCredentials.username = localEnv.cloudant_username;
        cloudantCredentials.password = localEnv.cloudant_password;
        cloudantCredentials.host = localEnv.cloudant_host;
        cloudantCredentials.port = localEnv.cloudant_port;
        cloudantCredentials.url = localEnv.cloudant_url;
    }
    // console.log("Cloudant Credentials");
    // console.log(cloudantCredentials);

    try {
        blockchainCredentials = vcapServices.getCredentials('ibm-blockchain-5-prod');
    } catch (e) {
        console.log('Running local...');
    }
    if (Object.keys(blockchainCredentials).length === 0){
        blockchainCredentials = require('./blockchainCred.json');
    }
    // console.log(blockchainCredentials);
    // console.log('Blockchain CREDENTIALS:');
    // console.dir(blockchainCredentials);

    // console.log(localEnv);
    module.exports = {
        cloudant : {
            username: cloudantCredentials.username,
            password: cloudantCredentials.password,
            host: cloudantCredentials.host,
            port: cloudantCredentials.port,
            url: cloudantCredentials.url
        },
        blockchain : blockchainCredentials,
        getCredentials: function (service_name) {
            return this[service_name];
        }
    };
}());