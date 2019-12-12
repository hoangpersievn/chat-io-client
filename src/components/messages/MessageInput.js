import React, { useState } from 'react';

import './MessageInput.css';

const MessageInput = (props) => {
    const { sendMessage } = props;
    const [messageInput, setMessageInput] = useState("");

    const hanldeInputOnKeyUp = (e) => {
        if(e.keyCode === 13){
            sendMessage(messageInput)
        }
    };

    const handleInputOnChange = (value) => {
        setMessageInput(value);
    };

    return (
        <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
                <input 
                    className="message_input" 
                    placeholder="Type your message here..."
                    onKeyUp={(event) => hanldeInputOnKeyUp(event)} 
                    onChange={(event) => handleInputOnChange(event.target.value)}
                />
            </div>
            <div className="send_message">
                <div className="icon"></div>
                <div 
                    className="text"
                    onClick={() => sendMessage(messageInput)}
                >
                    Send
                </div>
            </div>
        </div>
    );
};

export default MessageInput;