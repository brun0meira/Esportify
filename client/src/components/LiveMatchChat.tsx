import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import instance from '../axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0px;
  overflow: hidden;
  background: #1e1e2d;
`;

const Header = styled.div`
  background: #010b15;
  height: 7%;
  color: #ffeb00;
  border-bottom: 1px solid #3a3a4a;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  height: 83%;
  overflow-y: auto;
  padding: 15px;
  background: #010b15;
`;

const Message = styled.div<{ isCurrentUser?: boolean }>`
  margin-bottom: 10px;
  padding: 10px 15px;
  background: ${({ isCurrentUser }) => isCurrentUser ? '#7165e3' : '#3a3a4a'};
  border-radius: 5px;
  color: white;
  align-self: ${({ isCurrentUser }) => isCurrentUser ? 'flex-end' : 'flex-start'};
  max-width: 80%;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background: #010b15;
  border-top: 1px solid #3a3a4a;
  height: 10%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 0px;
  border: none;
  background: #3a3a4a;
  color: white;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 0 20px;
  background: #ffeb00;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0px;
  cursor: pointer;
`;

export const LiveMatchChat = () => {
  const matchId = "55e20720-9b0f-441b-8ef9-0caf43881e66";
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState('');
  const [opponent, setOpponent] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMatchChat = async () => {
      try {
        const response = await instance.get(`/matches/${matchId}`);
        if (response.data.liveChat) {
          setRoomId(response.data.liveChat.id);
          setOpponent(response.data.opponent);
          const messagesRes = await instance.get(`/chat/rooms/${response.data.liveChat.id}/messages`);
          setMessages(messagesRes.data);
  
          if (socket) {
            socket.emit('joinRoom', response.data.liveChat.id);
          }
        }
      } catch (error) {
        console.error('Error loading match chat:', error);
      }
    };
  
    if (socket) {
      loadMatchChat();
  
      socket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
      });
  
      return () => {
        socket.off('newMessage');
      };
    }
  }, [matchId, socket]);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !roomId) return;

    try {
      socket.emit('sendMessage', {
        roomId,
        content: input,
        userId,
      });

      console.log('Message sent:', input);

      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container>
      <Header>⚡ Chat Ao Vivo - FURIA vs {opponent}</Header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message 
            key={index}
            isCurrentUser={msg.user.id === userId}
          >
            <strong>{msg.user.name}: </strong>
            {msg.content}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Envie sua mensagem de apoio..."
        />
        <SendButton onClick={handleSend}>Enviar</SendButton>
      </InputContainer>
    </Container>
  );
};