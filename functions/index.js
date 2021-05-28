require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Vonage = require('@vonage/server-sdk');

admin.initializeApp();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

const from = process.env.VONAGE_FROM_NUMBER;
const to = process.env.VONAGE_TO_NUMBER;
const text = 'A text message sent using the Vonage SMS API';

// This function will serve as the webhook for incoming SMS messages,
// and will log the message into the Firebase Realtime Database
exports.inboundSMS = functions.https.onRequest(async (req, res) => {
  const params = Object.assign(req.query, req.body);
  await admin.database().ref('/msgq').push(params);
  res.sendStatus(200);
});

// This function listens for updates to the Firebase Realtime Database
// and sends a message back to the original sender
exports.sendSMS = functions.database.ref('/msgq/{pushId}')
  .onCreate(async (snapshot) => {
    const result = await new Promise((resolve, reject) => {
      vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          return reject(new Error(err));
        } else {
          if (responseData.messages[0]['status'] === "0") {
            return resolve(`Message sent successfully: ${responseData.messages[0]['message-id']}`);
          } else {
            return reject(new Error(`Message failed with error: ${responseData.messages[0]['error-text']}`));
          }
        }
      });
    });
    return snapshot.ref.parent.child('result').set(result);
  });