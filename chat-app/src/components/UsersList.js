import React, { Component } from 'react';
import './UsersList.scss';
import '../assets/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getLeftTime, getMessSentTime } from '../util/util'

class UsersList extends Component {
	state = {
		searchInput: '',
		currentId: this.props.currentId,
		currentChatToUser: undefined
	}
	onChangeHandler(e){
	    this.setState({
	      searchInput: e.target.value,
	    })
	  }

	onClickUser(user) {
		this.setState({currentChatToUser: user});
	}

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
		              <img height="42" width="42" src={user.photoURL} alt="avatar" />
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
          
            <img src={this.state.currentChatToUser.photoURL} alt="avatar" />
            <div className="chat-about">
              <div className="chat-with">{this.state.currentChatToUser.name}</div>
            </div>
            <i className="fa fa-star" />
          </div> )
          :
            <div className="chat-header clearfix">Click a user to chat with</div>
        }
          <div className="chat-history">
          { this.state.currentChatToUser ?
            <div>
            { messages && messages.filter(message => message.from===state.currentId && message.to===state.currentChatToUser.uid).map((message,index) => {
              	return (<ul key={index}>{message.mess.map((mes,index) => {
              		console.log(mes.date.toDate());
              		const date = getMessSentTime(mes.date.toDate());
              		return (
              			<li key={index} className="clearfix">
			                <div className={mes.owner===0?"message-data align-right":"message-data"}>
			                  <span className="message-data-time">{date}</span> &nbsp; &nbsp;
			                </div>
			                <div className={mes.owner===0?"message other-message float-right":"message my-message"}>
			                  {mes.content}
			                </div>
			            </li>
              		);
              	})}</ul>);
              })}
              
            </div>
            :
             ''
        	}
          </div> {/* end chat-history */}
          <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
            <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
            <button>Send</button>
          </div> 
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