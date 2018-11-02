import fire from 'firebase';

var config = {
  apiKey: "AIzaSyBOYTlv7UGsbd896HM5nre6BfFDesPl3sY",
  authDomain: "fir-react-redux-edaf5.firebaseapp.com",
  databaseURL: "https://fir-react-redux-edaf5.firebaseio.com",
  storageBucket: "fir-react-redux-edaf5.appspot.com",
  messagingSenderId: "661614553631"
};
var firebase =  fire.initializeApp(config);

export default firebase;