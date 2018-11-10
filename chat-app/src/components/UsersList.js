import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UsersList.scss';
import '../assets/css/bootstrap.min.css';
import firebase from '../config/firebaseConfig'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getLeftTime, getMessSentTime } from '../util/util'

class UsersList extends Component {
	state = {
		message: '',
		searchInput: '',
		currentId: this.props.currentId,
		currentChatToUser: undefined,
		imageErr: false
	}
	onChangeHandler(e){
	    this.setState({
	      searchInput: e.target.value,
	    })
	  }

	onClickUser(user) {
		this.setState({currentChatToUser: user});
	}

	onChangeMessage(e) {
		this.setState({ message: e.target.value });
	}

	onSendMessage(e) {
		e.preventDefault();
		var state=this.state;
		if(this.state.currentChatToUser) {
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			var query;
			var db = firebase.firestore();
			db.collection('messages').where("from","==",state.currentId).where("to","==",state.currentChatToUser.uid).get().then(function(querySnapshot) {
				if(querySnapshot.size===0){
					db.collection('messages').where("to","==",state.currentId).where("from","==",state.currentChatToUser.uid).get().then(function(querySnapshot1) {
						if(querySnapshot1.size===0){
							db.collection('messages').add({
								from: state.currentId,
								to: state.currentChatToUser.uid,
								mess: [{
									content: state.message,
									//date: timestamp,
									owner: 0
								}]
							})
							return;
						} else {
							query = querySnapshot1;
							query.forEach(function(doc) {
					    		db.collection('messages').doc(doc.id).get().then(doc => {
					    			var mess = doc.data().mess;
					    			var mes = {
					    				content: state.message,
					    				//date: timestamp,
					    				owner: 1
					    			}
					    			mess.push(mes);
					    			db.collection('messages').doc(doc.id).update({
					    				mess: mess
					    			});
					    		})
					    	});
						}
					})
				} else {
					query = querySnapshot;
					query.forEach(function(doc) {
			    		db.collection('messages').doc(doc.id).get().then(doc => {
			    			var mess = doc.data().mess;
			    			var mes = {
			    				content: state.message,
			    				//date: timestamp,
			    				owner: 0
			    			}
			    			mess.push(mes);
			    			db.collection('messages').doc(doc.id).update({
			    				mess: mess
			    			});
			    		})
			    	});
				}
			});
			this.setState({message: ''});
		} else {
			alert('Please choose a user and resend your message');
			return;
		}
	}

	imageError() {
		this.setState({imageErr: true})
	}

	componentDidMount() {
     this.scrollToBottom();
}

componentDidUpdate() {
     this.scrollToBottom();
}

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

	render() {
		const state = this.state;
		const  users = this.props.users;
		const messages = this.props.messages;
		console.log(messages);

		return (
			<div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" value={this.state.searchInput} onChange={this.onChangeHandler.bind(this)} />
            <i className="fa fa-search" />
          </div>
          <ul className="list">
            { users && users.filter(user => this.state.currentId!==user.uid && (this.state.searchInput==='' || user.name.toUpperCase().includes(this.state.searchInput.toUpperCase()))).map((user,index) => {
              	return (
              		<li key={user.uid} className="clearfix" onClick={() => this.onClickUser(user)}><a href="javascript:">
		              <img className="avt" src={user.photoURL} alt="avatar" />
		              <div className="about">
		                <div className="name">{user.name}</div>
		                
		                <div className="status">
		                  <i className="fa fa-circle" /> {user.isOnline ? 'online' 
		                  	: getLeftTime(Math.abs(Date.now() - user.lastOnlineDate.toDate()) / 36e5)
		                  }
		                </div>
		              </div>
		            </a>
		            </li>
              	)
              })}
          </ul>
        </div>
        <div className="chat">
        { this.state.currentChatToUser ?
          (<div className="chat-header clearfix">
          
            <img className="avt" src={this.state.currentChatToUser.photoURL} alt="avatar" />
            <div className="chat-about">
              <div className="chat-with">{this.state.currentChatToUser.name}</div>
            </div>
            <i className="fa fa-star" />
          </div> )
          :
            <div className="chat-header clearfix">Click a user to chat with</div>
        }
          <div className="chat-history" ref={(el) => { this.messagesContainer = el; }}>
          { this.state.currentChatToUser ?
            <div>
            { messages && messages.filter(message => (message.from===state.currentId && message.to===state.currentChatToUser.uid)||(message.to===state.currentId && message.from===state.currentChatToUser.uid)).map((message,index) => {
              	return (<ul key={index}>{message.mess.map((mes,index) => {
              		//console.log(mes.date.toDate());
              		let owner = mes.owner;
              		if(message.to===state.currentId) {
              			owner = 1-owner;
              		}
              		//const date = getMessSentTime(mes.date.toDate());
              		return (
              			<li key={index} className="clearfix">
			                {/*<div className={owner===0?"message-data align-right":"message-data"}>
			                  <span className="message-data-time"></span> &nbsp; &nbsp;
			                </div>*/}
			                <div className={owner===0?"message other-message float-right":"message my-message"}>
			                  {mes.content}
			                </div>
			                {this.state.imageErr ? '' : (<img className="image" onError={this.imageError.bind(this)} src={mes.content} />)}
			            </li>
              		);
              	})}</ul>);
              })}
              
            </div>
            :
             ''
        	}
          </div> {/* end chat-history */}
          <form className="chat-message clearfix" onSubmit={this.onSendMessage.bind(this)}>
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} value={this.state.message} onChange={this.onChangeMessage.bind(this)} />
            <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
            <button>Send</button>
          </form> 
        </div> 
      </div>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		users: state.firestore.ordered.users,
		messages: state.firestore.ordered.messages
	}
}

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{ collection: 'users' }, { collection: 'messages'}
	])
)(UsersList);