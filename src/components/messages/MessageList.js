import React from 'react';

import MessageItem from './MessageItem';
import './MessageList.css';

const MessageList = (props) => {

    const showMessages = (mes) => {
        let resuslt = "";

        if(mes) {
            resuslt = mes.map( (item, index) => {
                return (
                    <MessageItem
                        key={index}
                        message={item.message}
                        user={item.userId === props.user ? true : false}
                    />
                )
            })
        };
        return resuslt;
    };

    return (
        <ul className="messages">
            {showMessages(props.messages)}
        </ul>
    );
}

export default MessageList;