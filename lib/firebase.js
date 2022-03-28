import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9iJMxmhjgMbjuSZV5dgUlGo33vVNg47M",
  authDomain: "abonnements-jeux.firebaseapp.com",
  projectId: "abonnements-jeux",
  storageBucket: "abonnements-jeux.appspot.com",
  messagingSenderId: "200851637709",
  appId: "1:200851637709:web:424518df813646ef7cf084",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
  };
}
