import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = localStorage.getItem('access_token');


    useEffect(() => {
      const socketInstance = io('http://localhost:5500', {
        withCredentials: true,
        autoConnect: true,
        auth: {
          token,
        },
      });
  
      socketInstance.on('connect', () => {
        console.log('Conectado ao WebSocket');
      });
  
      socketInstance.on('disconnect', () => {
        console.log('Desconectado do WebSocket');
      });
  
      socketInstance.on('connect_error', (err) => {
        console.error('Erro de conexão:', err);
      });
  
      setSocket(socketInstance);
  
      return () => {
        socketInstance.off('connect');
        socketInstance.off('disconnect');
        socketInstance.off('connect_error');
        socketInstance.disconnect();
      };
    }, []);
  
    return socket;
  };