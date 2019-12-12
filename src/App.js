import React, { Component } from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import _map from 'lodash/map';

import MessageList from './components/messages/MessageList';
import MessageInput from './components/messages/MessageInput';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages : [
                {id: 1, userId: 0, message: 'hello'},
                {id: 2, userId: 1, message: 'hi'}
            ],
            user : 1
        };
        this.socket = null;
    };

    componentDidMount() {
        this.socket = io('localhost:6969');
        this.socket.on('id', res => this.setState({user : res}));
        this.socket.on('newMessage', res => this.newMessage(res));
    };

    newMessage = (mes) => {
        const { messages } = this.state;
        let objMessage = $('.messages');
        let ids = _map(messages, 'id');
        let max = Math.max(...ids);

        messages.push({
            id : max + 1,
            userId : mes.id,
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
        console.log('send!')
        if(mes) {
            this.socket.emit('newMessage', mes);
            mes = "";
        }
    }
    
    render() {
        return (
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
        );
    };
};

export default App;
