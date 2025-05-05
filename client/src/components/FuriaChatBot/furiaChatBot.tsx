import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import instance from '../../axios';

const ChatbotContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #010b15;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
`;

const Header = styled.div`
  background: #010b15;
  color: #ffeb00;
  padding: 15px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3a3a4a;
`;

const Logo = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #010b15;
`;

const Message = styled.div<{ isBot?: boolean }>`
  margin-bottom: 15px;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 0px;
  background: ${({ isBot }) => isBot ? '#2d2d3d' : '#7165e3'};
  color: white;
  align-self: ${({ isBot }) => isBot ? 'flex-start' : 'flex-end'};
  white-space: pre-line;

`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background: #010b15;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #3a3a4a;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 0px;
  border: none;
  background: #3a3a4a;
  color: white;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 0 15px;
  background: #ffeb00;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0px;
  cursor: pointer;
`;

export const FuriaChatbot = () => {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startChat = async () => {
      const response = await instance.post('/chatbot/start');
      setSessionId(response.data.id);
      setMessages(response.data.messages);
    };
    startChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await instance.post('/chatbot/message', {
      sessionId,
      message: input
    });

    setMessages(prev => [...prev, response.data]);
  };

  return (
    <ChatbotContainer>
      <Header>
        <Logo src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" alt="FURIA" />
        FURIA Assistant
      </Header>
      
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isBot={msg.isBot}>
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
          placeholder="Digite sua mensagem..."
        />
        <SendButton onClick={handleSend}>Enviar</SendButton>
      </InputContainer>
    </ChatbotContainer>
  );
};