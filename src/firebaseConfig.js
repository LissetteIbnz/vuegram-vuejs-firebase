import firebase from 'firebase';
import 'firebase/firestore';
// firebase init goes here
import configFirebase from './../secrets';

firebase.initializeApp(configFirebase);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth; // const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};