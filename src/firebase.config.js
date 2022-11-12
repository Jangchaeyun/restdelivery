import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTDJkByBCyRRLltuYEn7JrM8VOk7d06Jw",
    authDomain: "resturantapp-2780e.firebaseapp.com",
    databaseURL: "https://resturantapp-2780e-default-rtdb.firebaseio.com",
    projectId: "resturantapp-2780e",
    storageBucket: "resturantapp-2780e.appspot.com",
    messagingSenderId: "205573098006",
    appId: "1:205573098006:web:16381580e03a7000a24337"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage };