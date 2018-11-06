import React, { Component } from 'react';
import './UsersList.scss';
import { connect } from 'react-redux';

class UsersList extends Component {
	state = {
		messages: [],
		message: {
			time: '10:14 AM, Today', 
			name: 'Olia', 
			content: ''
		}
	}

	render() {
		const { users } = this.props;
		return (
			<div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search" />
          </div>
          <ul className="list">
            <li className="clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
              <div className="about">
                <div className="name">Vincent Porter</div>
                <div className="status">
                  <i className="fa fa-circle online" /> online
                </div>
              </div>
            </li>
            
            { users && users.map(user => {
              	return (
              		<li className="clearfix">
		              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
		              <div className="about">
		                <div className="name">{user.displayName}</div>
		                <div className="status">
		                  <i className="fa fa-circle online" /> {user.isOnline ? 'online' : 'offline' }
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
		users: state.user.users
	}
}

export default connect(mapStatetoProps)(UsersList);