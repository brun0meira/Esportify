import { FuriaChatbot } from '../../components/FuriaChatBot/furiaChatBot';
import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer} from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const ChatBot: React.FC = () => {  
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <FuriaChatbot />
        </ContentContainer>
    </Container>
  );
}

export default ChatBot;
