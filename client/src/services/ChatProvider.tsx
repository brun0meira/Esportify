import React, { createContext, useContext, useState, useEffect } from 'react';
import instance from "../axios";

interface ChatContextType {
  rooms: any[];
  currentRoom: any;
  messages: any[];
  matches: any[];
  liveMatches: any[];
  loading: boolean;
  error: string | null;
  joinRoom: (roomId: string, userId: string) => Promise<void>;
  leaveRoom: (roomId: string, userId: string) => Promise<void>;
  sendMessage: (content: string, roomId: string, userId: string) => Promise<void>;
  createRoom: (name: string, userId: string, description?: string) => Promise<void>;
  getPublicRooms: () => Promise<void>;
  getRoomMessages: (roomId: string) => Promise<void>;
  getAllMatches: () => Promise<void>;
  getLiveMatches: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const chatService = {
  getPublicRooms: async () => {
    const response = await instance.get('chat/rooms/public');
    return response.data;
  },
  
  joinRoom: async (roomId: string, userId: string) => {
    const response = await instance.post('chat/rooms/join', { roomId, userId });
    return response.data;
  },

  leaveRoom: async (roomId: string, userId: string) => {
    const response = await instance.post('chat/rooms/leave', { roomId, userId });
    return response.data;
  },

  sendMessage: async (content: string, roomId: string, userId: string) => {
    const response = await instance.post('chat/messages', { content, roomId, userId });
    return response.data;
  },

  createRoom: async (name: string, userId: string, description?: string) => {
    const response = await instance.post('chat/rooms', { 
      name, 
      description, 
      createdById: userId 
    });
    return response.data;
  },

  getRoomMessages: async (roomId: string) => {
    const response = await instance.get(`chat/rooms/${roomId}/messages`);
    return response.data;
  },

  getAllMatches: async () => {
    const response = await instance.get('matches');
    return response.data;
  },

  getLiveMatches: async () => {
    const response = await instance.get('matches/live');
    return response.data;
  }
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [publicRooms, allMatches, liveMatches] = await Promise.all([
        chatService.getPublicRooms(),
        chatService.getAllMatches(),
        chatService.getLiveMatches()
      ]);
      setRooms(publicRooms);
      setMatches(allMatches);
      setLiveMatches(liveMatches);
    } catch (err) {
      setError("Falha ao carregar dados do chat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Funções do chat
  const joinRoom = async (roomId: string, userId: string) => {
    try {
      const room = await chatService.joinRoom(roomId, userId);
      setCurrentRoom(room);
      const roomMessages = await chatService.getRoomMessages(roomId);
      setMessages(roomMessages);
    } catch (err) {
      setError("Falha ao entrar na sala");
    }
  };

  const leaveRoom = async (roomId: string, userId: string) => {
    try {
      await chatService.leaveRoom(roomId, userId);
      setCurrentRoom(null);
      setMessages([]);
    } catch (err) {
      setError("Falha ao sair da sala");
    }
  };

  const sendMessage = async (content: string, roomId: string, userId: string) => {
    try {
      const newMessage = await chatService.sendMessage(content, roomId, userId);
      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      setError("Falha ao enviar mensagem");
    }
  };

  const createRoom = async (name: string, userId: string, description?: string) => {
    try {
      const newRoom = await chatService.createRoom(name, userId, description);
      setRooms(prev => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError("Falha ao criar sala");
    }
  };

  // Funções adicionais para atualização de dados
  const getPublicRooms = async () => {
    try {
      const publicRooms = await chatService.getPublicRooms();
      setRooms(publicRooms);
    } catch (err) {
      setError("Falha ao carregar salas públicas");
    }
  };

  const getRoomMessages = async (roomId: string) => {
    try {
      const messages = await chatService.getRoomMessages(roomId);
      setMessages(messages);
    } catch (err) {
      setError("Falha ao carregar mensagens");
    }
  };

  const getAllMatches = async () => {
    try {
      const matches = await chatService.getAllMatches();
      setMatches(matches);
    } catch (err) {
      setError("Falha ao carregar partidas");
    }
  };

  const getLiveMatches = async () => {
    try {
      const liveMatches = await chatService.getLiveMatches();
      setLiveMatches(liveMatches);
    } catch (err) {
      setError("Falha ao carregar partidas ao vivo");
    }
  };

  return (
    <ChatContext.Provider value={{
      rooms,
      currentRoom,
      messages,
      matches,
      liveMatches,
      loading,
      error,
      joinRoom,
      leaveRoom,
      sendMessage,
      createRoom,
      getPublicRooms,
      getRoomMessages,
      getAllMatches,
      getLiveMatches
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat deve ser usado dentro de ChatProvider");
  return context;
};