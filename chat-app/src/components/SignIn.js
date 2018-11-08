import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../config/firebaseConfig'
import UsersList from './UsersList.js';
import { addUser } from '../store/actions/userAction';
import { connect } from 'react-redux';

// var config = {
//   apiKey: "AIzaSyBOYTlv7UGsbd896HM5nre6BfFDesPl3sY",
//   authDomain: "fir-react-redux-edaf5.firebaseapp.com",
//   databaseURL: "https://fir-react-redux-edaf5.firebaseio.com",
//   storageBucket: "fir-react-redux-edaf5.appspot.com",
//   messagingSenderId: "661614553631"
// };
// firebase.initializeApp(config);


class SignIn extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      isSignedIn: false
	    }
	  }
    uiConfig = {
	    signInFlow: "popup",
	    signInOptions: [
	      firebase.auth.GoogleAuthProvider.PROVIDER_ID
	    ],
	    callbacks: {
	      signInSuccessWithAuthResult: () => false
	    }
	}

    componentDidMount() {
    	const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    	
    	let props = this.props;
    	let flag = 0;
	    firebase.auth().onAuthStateChanged(user => {
		    console.log('user: ',user);
		    this.setState({isSignedIn: !!user})

		    var db = firebase.firestore();
		    db.collection('users').where("uid","==",user.uid)
		    	.get()
		    	.then(function(querySnapshot) {
		    		if(querySnapshot.size === 0) {
		    			let userInfo = {
						   	name: user.displayName,
						    email: user.email,
						    uid: user.uid,
						    photoURL: user.photoURL,
						    lastOnlineDate: timestamp,
						    isOnline: true
						};
					    props.addUser(userInfo);
		    		}
		    		else {
			    		querySnapshot.forEach(function(doc) {
			    			flag = 1;
			    			console.log(flag);
			    			db.collection('users').doc(doc.id).update({
			    				lastOnlineDate: timestamp,
			    				isOnline: true
			    			});
			    			
			    		});
			    	}
		    	});
		})
	}

	handleSignOut() {
		firebase.auth().signOut();
		const timestamp = firebase.firestore.FieldValue.serverTimestamp();

		var db = firebase.firestore();
		db.collection('users').where("uid","==",firebase.auth().currentUser.uid)
		    .get()
		    .then(function(querySnapshot) {
		    	querySnapshot.forEach(function(doc) {
		    		db.collection('users').doc(doc.id).update({
		    			lastOnlineDate: timestamp,
		    			isOnline: false
		    		});
		    	});
		    })
	}

	render() {
		return (
			<div>
			{this.state.isSignedIn ? 
	          (<span>
	            <nav className="navbar navbar-default">
	              <div className="container-fluid">
	                <div className="nav navbar-nav">
	                  <li><a><img alt="avatar" height="42" width="42" src={firebase.auth().currentUser.photoURL} /></a></li>
	                  <li><a><h4><b>{firebase.auth().currentUser.displayName}</b></h4></a></li>
	                </div>
	                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	                  <ul className="nav navbar-nav navbar-right">
	                    <li><a><button className="btn btn-danger" onClick={this.handleSignOut}>Sign out</button></a></li>
	                  </ul>
	                </div>
	              </div>
	            </nav>
	            <UsersList />
	          </span>)
	         :
	          (<span>
	            <h1>Login</h1>
	            <StyledFirebaseAuth 
	              uiConfig={this.uiConfig}
	              firebaseAuth={firebase.auth()}
	            />
	          </span>)
	        }
	        </div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addUser: (user) => dispatch(addUser(user))
	}
}

export default connect(null, mapDispatchToProps)(SignIn);