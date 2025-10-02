// functions/index.js

const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK once
admin.initializeApp();

// Export the core 'app' and 'chat' functions
const { app } = require('./src/app');
const { chat } = require('./src/chat');
const { dualWrite } = require('./src/dualWrite');


exports.app = app;
exports.chat = chat;
exports.dualWrite = dualWrite;