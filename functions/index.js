require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Vonage } = require('@vonage/server-sdk');

admin.initializeApp();

// If you are using .env
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

// // If you are using the Firebase Environment Variables
// const {
//   api_key,
//   api_secret
// } = functions.config().vonage;

// This function will serve as the webhook for incoming SMS messages,
// and will log the message into the Firebase Realtime Database
exports.inboundSMS = functions.https.onRequest(async (req, res) => {
    let params;
    if (Object.keys(req.query).length === 0) {
      params = req.body;
    } else {
      params = req.query;
    }
    await admin.database().ref('/msgq').push(params);
    res.sendStatus(200);
  });
  
// This function listens for updates to the Firebase Realtime Database
// and sends a message back to the original sender
exports.sendSMS = functions.database
  .ref('/msgq/{pushId}')
  .onCreate(async (message) => {
    const { msisdn, text, to } = message.val();
    // the incoming object - 'msisdn' is the your phone number, and 'to' is the Vonage number
    return vonage.sms.send(to, msisdn, `You sent the following text: ${text}`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (res.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(`Message failed with error: ${res.messages[0]['error-text']}`);
        }
      }
    })
  });