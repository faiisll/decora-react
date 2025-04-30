import clsx from 'clsx';
import moment from 'moment';
import React from 'react';

const ChatBubble = ({message = "", createdAt = Date.now(), isSelf = true, name = "", role = "", roleTag = ""}) => {

    const parseDate = (date) => {
        const now = moment();
        const dateMoment = moment(date)
  
        // Check if the date is today
        if (now.isSame(dateMoment, 'day')) {
            return dateMoment.format('HH:mm'); // Only time if today
        }
        
        // Check if the date is yesterday
        else if (now.subtract(1, 'day').isSame(dateMoment, 'day')) {
            return 'Yesterday ' + dateMoment.format('HH:mm'); // "Yesterday" and time
        }

        // Otherwise, format the full date like "25 Apr"
        else {
            return dateMoment.format('HH:mm - DD MMM');
        }
    }
    return (
        <div className={clsx("chat", !isSelf ? 'chat-start' : 'chat-end')}>
          {!isSelf && <div className="chat-header">
            {name} ({roleTag || role})
          </div>}
          <div className={clsx("chat-bubble", isSelf && "chat-bubble-primary")}>{message}</div>
          <div className="chat-footer opacity-50">{parseDate(createdAt)}</div>
        </div>
    );
}

export default ChatBubble;
