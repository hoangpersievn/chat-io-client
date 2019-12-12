import React from 'react';

import './MessageItem.css';

const MessageItem = (props) => {
    
    return (
        <li className={`message ${props.user ? "right" : "left"}`}>
            <div className="avatar"></div>
            <div className="text_wrapper">
                <div className="text"> {props.message}</div>
            </div>
        </li>
    );
};

export default MessageItem;