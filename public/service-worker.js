
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const getCurrentUser = () => new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
    });
});

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            getCurrentUser().then(user => {
                if (user) {
                    return user.getIdToken().then((token) => {
                        const headers = new Headers(request.headers);
                        headers.append('Authorization', `Bearer ${token}`);

                        const newRequest = new Request(request, { headers });
                        return fetch(newRequest);
                    });
                }
                return fetch(request);
            })
        );
        return;
    }

    if (request.mode === 'navigate' && url.pathname === '/') {
        event.respondWith(
            getCurrentUser().then(user => {
                if (user) {
                    return Response.redirect('/chat', 302);
                }
                return Response.redirect('/login', 302);
            })
        );
    }
});
