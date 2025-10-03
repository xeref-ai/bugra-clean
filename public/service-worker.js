// public/service-worker.js

// Import the configuration file
importScripts('/firebase-config.js'); 
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

if (self.firebaseConfig && self.firebaseConfig.apiKey) {
  firebase.initializeApp(self.firebaseConfig);

  try {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function(payload) {
      console.log('[service-worker.js] Received background message ', payload);
      
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } catch (err) {
    console.error('Error initializing Firebase Messaging in service worker:', err);
  }
} else {
  console.error('Firebase config not found. Service worker not initialized.');
}
