const functions = require('firebase-functions');
var dialogflowFulfillment = require("./fulfillment");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflowFulfillment);
