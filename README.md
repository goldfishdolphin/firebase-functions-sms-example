# Vonage SMS with Firebase Functions

This example sends and receives Vonage SMS with Cloud Functions for Firebase. Inbound SMS messages use a webhook on Firebase to add the message to the Firebase Realtime Database. Upon creation, a triggered function will echo back the original text to the phone number.

## Welcome to Vonage

If you're new to Vonage, you can [sign up for a Vonage account](https://dashboard.nexmo.com/sign-up?utm_source=DEV_REL&utm_medium=github&utm_campaign=firebase-functions-sms-example) and get some free credit to get you started.

## Project Prerequisites
+ [Google Cloud account](https://cloud.google.com/)
+ [Vonage account](https://dashboard.nexmo.com/sign-up?utm_source=DEV_REL&utm_medium=github&utm_campaign=firebase-functions-sms-example)
+ SMS enabled phone

## Install Example

1. Clone this repository and switch to the cloned directory

### Setup Firebase

1. Setup [Firebase Tools](https://firebase.google.com/docs/cli)
    1. Run `firebase init functions`
    2. Create a new project
    3. Select JavaScript
    4. Add ESLint (optional)
    5. Do not overwrite any files
    6. Install all dependencies
2. Open Firebase console https://console.firebase.google.com/project/YOUR-PROJECT-ID/
overview
. Go to ⚙️ -> Project Settings
    1. Update `Google Cloud Platform (GCP) resource location` to something near your location
    1. Go to ⚙️ -> Usage and Billing -> Details & Settings
    1. Update the plan to `Blaze - Pay As You Go`
3. Run `firebase deploy --only functions`
    1. Copy the function route - `https://[LOCATION]-[YOUR-PROJECT-ID].cloudfunctions.net/inboundSMS`

### Setup Vonage

1. Setup the [Vonage CLI](https://github.com/Vonage/vonage-cli)
2. Create a new application `vonage apps:create`
3. Purchase a new phone number using. The example below will buy an available US phone number. For more information on SMS Countries and Features - visit the [API Support Help Center](https://help.nexmo.com/hc/en-us/articles/115011451687-SMS-Numbers-Features-Overview)
    `vonage numbers:search US`
    `vonage numbers:buy [NUMBER] --country_code US`
4. Link the number (for instance 15555555555) to the application `vonage apps:link [APPID] --number=[NUMBER]`
5. Add the function to the inbound SMS in the Vonage dashboard `https://[LOCATION]-[YOU
R-PROJECT-ID].cloudfunctions.net/inboundSMS`
6. Add your Vonage keys to the Firebase environment variables `firebase functions:config:set vonage.api_key="Your Key" vonage.api_secret="Your Secret"`

### Try It Out
Text anything you want to the purchased number, and it will echo back what you sent in.

```
To: 15555555555
Hello World!

From: 15555555555
You sent the following text: Hello World!
```

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

* Open an issue on this repository
* Tweet at us! We're [@VonageDev on Twitter](https://twitter.com/VonageDev)
* Or [join the Vonage Community Slack](https://developer.vonage.com/community/slack)

## Further Reading

* Check out the [Developer Documentation](https://developer.vonage.com)
* Details about [Vonage SMS Functionality](https://developer.vonage.com/messaging/sms/overview)
* Getting started with [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/get-started)

