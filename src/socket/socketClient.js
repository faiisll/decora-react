import { io } from "socket.io-client";

const url = import.meta.env.VITE_API_URL_SOCKET
const token = localStorage.getItem('token')
const socketClient = io(url, {
    autoConnect: false,
    auth: {
        token: token
    },

})

export default socketClient