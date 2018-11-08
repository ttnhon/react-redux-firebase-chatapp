import React, { Component } from 'react';
import './UsersList.scss';
import '../assets/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import getLeftTime from '../util/util'

class UsersList extends Component {
	state = {
		searchInput: '',
		messages: [],
		message: {
			time: '10:14 AM, Today', 
			name: 'Olia', 
			content: ''
		}
	}
	onChangeHandler(e){
	    this.setState({
	      searchInput: e.target.value,
	    })
	  }
	render() {
		const { users } = this.props;

		return (
			<div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" value={this.state.searchInput} onChange={this.onChangeHandler.bind(this)} />
            <i className="fa fa-search" />
          </div>
          <ul className="list">
            { users && users.filter(user => this.state.searchInput==='' || user.name.toUpperCase().includes(this.state.searchInput.toUpperCase())).map((user,index) => {
              	return (
              		<li key={index} className="clearfix">
		              <img height="42" width="42" src={user.photoURL} alt="avatar" />
		              <div className="about">
		                <div className="name">{user.name}</div>
		                
		                <div className="status">
		                  <i className="fa fa-circle" /> {user.isOnline ? 'online' 
		                  	: getLeftTime(Math.abs(Date.now() - user.lastOnlineDate.toDate()) / 36e5)
		                  }
		                </div>
		              </div>
		            
		            </li>
              	)
              })}
          </ul>
        </div>
        <div className="chat">
          <div className="chat-header clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
            <div className="chat-about">
              <div className="chat-with">Chat with Vincent Porter</div>
              <div className="chat-num-messages">already 1 902 messages</div>
            </div>
            <i className="fa fa-star" />
          </div> {/* end chat-header */}
          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                  <span className="message-data-name">Olia</span> <i className="fa fa-circle me" />
                </div>
                <div className="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>
              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                  Are we meeting today? Project has been already finished and I have results to show you.
                </div>
              </li>
              
              
            </ul>
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
		users: state.firestore.ordered.users
	}
}

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(UsersList);