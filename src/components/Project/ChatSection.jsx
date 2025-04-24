import { useEffect, useState } from 'react';
import clsx from 'clsx';
import socketClient from '../../socket/socketClient';

const messages = [
  {
    content: "Let's discuss the timeline for the living room renovation.",
    sender: "self",
    timestamp: "10:30 AM",
  },
  {
    content: "I'll check the availability of the materials.",
    sender: "other",
    timestamp: "10:32 AM",
  },
];

export default function ChatSection({projectId}) {

  useEffect(() => {
    socketClient.connect()
    socketClient.on('connect', () => {
      console.log('Connected to server')
    })

    socketClient.on('message', (data) => {
      console.log('Received from server:', data)
    })

    socketClient.emit("joinRoom", projectId)


    return () => {
      socketClient.disconnect()
      return
    }
  }, [])
  const [message, setMessage] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  const handleSendMessage = () => {
    // Send message logic here

    
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Project Chat</h2>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={clsx(
              'flex items-end',
              msg.sender === 'self' ? 'justify-end' : ''
            )}>
              <div className={clsx(
                'px-4 py-2 rounded-lg max-w-xs',
                msg.sender === 'self'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              )}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">New Message</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered"
              />
              <textarea
                placeholder="Message"
                className="textarea textarea-bordered h-32"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="btn btn-sm"
                  onClick={() => setShowNewMessageModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleSendMessage()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
