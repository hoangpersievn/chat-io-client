import React, { Component } from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import _map from 'lodash/map';

import MessageList from './components/messages/MessageList';
import MessageInput from './components/messages/MessageInput';
import MessageLogin from './components/messages/MessageLogin';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            user: {id: '', name: ''},
            userOnline: []
        };
        this.socket = null;
    };

    componentDidMount() {
       
        this.socket = io('localhost:6969');
        this.socket.on('newMessage', res => this.newMessage(res));
        this.socket.on('id', res => this.setState({user : res}));
        this.socket.on('loginFail', _ => {alert("Name is exist.")});
        this.socket.on('loginSuccess', res => this.setState({user: { id: this.socket.id, name: res}}));
        this.socket.on('updateUesrList', res => this.setState({userOnline: res}));
    };

    newMessage = (mes) => {
        const { messages } = this.state;
        let objMessage = $('.messages');
        let ids = _map(messages, 'id');
        let max = Math.max(...ids);

        messages.push({
            id : max + 1,
            userId : mes.user.id,
            userName : mes.user.name,
            message : mes.data
        });

        if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight ) {
            $('.message_input').val("")
            this.setState({messages});
            objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

        } else {
            $('.message_input').val("")
            this.setState({messages});
            if (mes.id === this.state.user) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
        }
    };

    sendNewMessage = (mes) => {
        console.log('User current : ', this.state.user.name);
        console.log(this.state.userOnline)
        if(mes) {
            this.socket.emit('newMessage', {data: mes, user: this.state.user});
            mes = "";
        }
    }
    
    handleInputLoginOnClick = (value) => {
        this.socket.emit("login", value); 
    };

    render() {
        return (
            <div className="chat_box">
                { this.state.user.id && this.state.user.name 
                    ?
                        <div className="chat_window">
                            <div className="top_menu">
                                <div className="buttons">
                                    <div className="button close"></div>
                                    <div className="button minimize"></div>
                                    <div className="button maximize"></div>
                                </div>
                                <div className="title">Chat</div>
                            </div>
                            <MessageList
                                user={this.state.user}
                                messages={this.state.messages}
                                typing={this.state.typing}
                            />
                            <MessageInput
                                sendMessage={this.sendNewMessage}
                            />
                        </div>
                    :
                        <MessageLogin
                            handleInputLoginOnClick={this.handleInputLoginOnClick}
                        />
                }   
            </div>
        );
    };
};

export default App;
