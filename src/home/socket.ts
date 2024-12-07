import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3500', {
  autoConnect: false, // Manually connect after user login
});

export const connectSocket = (userId: string) => {
  socket.connect();
  socket.emit('register', userId);
};

export const sendMessage = (senderId: string, receiverId: string, message: string) => {
  socket.emit('sendMessage', { senderId, receiverId, message });
};

export const onReceiveMessage = (callback: (payload: { senderId: string; message: string }) => void) => {
  socket.on('receiveMessage', callback);
};

export default socket;
