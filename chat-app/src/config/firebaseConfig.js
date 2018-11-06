import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyBOYTlv7UGsbd896HM5nre6BfFDesPl3sY",
  authDomain: "fir-react-redux-edaf5.firebaseapp.com",
  projectId: "fir-react-redux-edaf5",
  databaseURL: "https://fir-react-redux-edaf5.firebaseio.com",
  storageBucket: "fir-react-redux-edaf5.appspot.com",
  messagingSenderId: "661614553631"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;