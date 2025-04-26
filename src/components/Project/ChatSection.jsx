import { useEffect, useMemo, useRef, useState } from 'react';
import socketClient from '../../socket/socketClient';
import { useGetChatsQuery } from '../../store/apis/projectApi';
import ChatBubble from '../Chat/ChatBubble';


export default function ChatSection({projectId, user}) {
  const chatContainerRef = useRef(null);
  const {data: chatDatas, isLoading, refetch} = useGetChatsQuery(projectId)
  const [message, setMessage] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [messages, setMessages] = useState([])
  const onMessage = (data) => {
    

  }

  const allMessages = useMemo(() => {

    if(!chatDatas || isLoading) return []

    return [...chatDatas.data, ...messages]

  }, [chatDatas, messages])

  const handleSendMessage = (e) => {
    // Send message logic here

    e.preventDefault()
    const room = 'room-'+projectId
    const dataSend = {room, projectId, createdAt: Date.now(), message, from: user, by: user.id}
    socketClient.emit('message', dataSend)

    setMessages((oldMessages) => [...oldMessages, dataSend])
    
    setMessage('');
  };


  const handleSocket = () => {
    socketClient.connect()
    socketClient.on('connect', () => {
      console.log('Connected to server')
    })

    socketClient.emit('joinRoom', projectId)

    socketClient.on('joinedRoom', (data) => {
      console.log(data.message); // Output: "Joined room: room-12345"
    })

    socketClient.on('message', (data) => {
      setMessages((oldMessages) => [...oldMessages, data])
    })

  }
  
  useEffect(() => {
    refetch()
    handleSocket()

    return () => {
      socketClient.emit('leaveRoom', projectId)
      socketClient.disconnect()
      return
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]); // This effect will run whenever `allMessages` changes
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 h-[40vh] overflow-y-auto" ref={chatContainerRef}>

        {allMessages.map((chat, index) => (
          <ChatBubble 
          key={index} 
          name={chat.from.name} 
          createdAt={chat.createdAt}
          message={chat.message}
          role={chat.from.role}
          roleTag={chat.from.roleTag}
          isSelf={chat.by === user.id} />
        ))}

        </div>
        <div className="mt-6">
          <div className="flex space-x-2">
                <form onSubmit={handleSendMessage} className="flex space-x-2 w-full">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type='submit'
                    className="btn btn-primary"
                    disabled={!message.trim()}
                  >
                    Send
                  </button>
                  
                </form>
          </div>
        </div>
      </div>
    </div>
  );
}
