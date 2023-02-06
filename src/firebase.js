import firebase from "firebase/app";
import 'firebase/auth';




const firebaseConfig={
    apiKey: "AIzaSyA9BQ9D2pYOTTFqqHNcrou31RI6ifvRgus",
    authDomain: "chats-e6df7.firebaseapp.com",
    projectId: "chats-e6df7",
    storageBucket: "chats-e6df7.appspot.com",
    messagingSenderId: "949812003714",
    appId: "1:949812003714:web:41b4a72d2fd5b0b73c859b"

}

const firebaseApp=firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();