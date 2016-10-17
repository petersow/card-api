'use strict';

const CARD_TABLE_NAME = "card-db";

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getCard = (event, context, callback) => {
  console.log("Recieved the request with card code [%s]", event.path.cardCode);

  var params = {
    TableName: CARD_TABLE_NAME,
    Key:{
      "code": event.path.cardCode
    }
  };

  dynamo.get(params, function(err, data) {
    if (err) {
      console.log("Error while performing GET [%s]", JSON.stringify(err))
      callback(new Error('[500] Error'));
    } else {
      var jsonData = JSON.stringify(data);
      // jsonData isn't a map...its a string!
      console.log("Got - " + jsonData);
      console.log("Got Item - " + data['Item']);
      console.log("Got item - " + data['item']);
      if(data['Item'] && data['Item'].code) {
        callback(null, data['Item']);
      } else {
        callback(new Error('[404] Not found'));
      }
    }
  });
};

module.exports.postCard = (event, context, callback) => {
  console.log("Recieved the request with body [%s]", JSON.stringify(event.body));

  const params = {
    TableName: CARD_TABLE_NAME,
    Item: event.body
  };

  return dynamo.put(params, callback);
  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.getCardsBySet = (event, context, callback) => {
  console.log("Recieved the request with set code [%s]", event.path.setCode);
  callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
