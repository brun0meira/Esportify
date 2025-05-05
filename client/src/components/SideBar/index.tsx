import React, { useState, useEffect } from 'react';
import { Container, SideBarList, SideBarItem } from './style';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InstagramIcon from '@mui/icons-material/Instagram';
import ChatIcon from '@mui/icons-material/Chat';
import ForumIcon from '@mui/icons-material/Forum';

const SideBar: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>(() => {
        return localStorage.getItem('selectedItem') || 'Eventos';
      });

    const isAdmin = localStorage.getItem('admin') === 'true';

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    useEffect(() => {
        localStorage.setItem('selectedItem', selectedItem);
    }, [selectedItem]);
    
    return (
        <Container>
        <SideBarList>
            <SideBarItem href='/home' onClick={() => handleItemClick('Eventos')}>
                <hr style={{backgroundColor: selectedItem != 'Eventos' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Eventos' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <EventIcon sx={{ color: selectedItem === 'Eventos' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Eventos' ? '#407BFF' : '#5C5F62' }}>Eventos</p>
            </SideBarItem>
            <SideBarItem href='/news' onClick={() => handleItemClick('Noticias')}>
                <hr style={{backgroundColor: selectedItem != 'Noticias' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Noticias' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <NewspaperIcon sx={{ color: selectedItem === 'Noticias' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Noticias' ? '#407BFF' : '#5C5F62' }}>Noticias</p>
            </SideBarItem>
            <SideBarItem href='/escalacao' onClick={() => handleItemClick('Escalação')}>
                <hr style={{backgroundColor: selectedItem != 'Escalação' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Escalação' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <Diversity3Icon sx={{ color: selectedItem === 'Escalação' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Escalação' ? '#407BFF' : '#5C5F62' }}>Escalação</p>
            </SideBarItem>
            <SideBarItem href='/exclusive-content' onClick={() => handleItemClick('Conteúdo Exclusivo')}>
                <hr style={{backgroundColor: selectedItem != 'Conteúdo Exclusivo' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Conteúdo Exclusivo' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <LocalMallIcon sx={{ color: selectedItem === 'Conteúdo Exclusivo' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Conteúdo Exclusivo' ? '#407BFF' : '#5C5F62' }}>Conteúdo Exclusivo</p>
            </SideBarItem>
            <SideBarItem href='/perfil' onClick={() => handleItemClick('Perfil')}>
                <hr style={{backgroundColor: selectedItem != 'Perfil' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Perfil' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <AnalyticsIcon sx={{ color: selectedItem === 'Perfil' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Perfil' ? '#407BFF' : '#5C5F62' }}>Perfil</p>
            </SideBarItem>
            <SideBarItem href='/chatbot' onClick={() => handleItemClick('ChatBot')}>
                <hr style={{backgroundColor: selectedItem != 'ChatBot' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'ChatBot' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <ChatIcon sx={{ color: selectedItem === 'ChatBot' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'ChatBot' ? '#407BFF' : '#5C5F62' }}>ChatBot</p>
            </SideBarItem>
            <SideBarItem href='/chat' onClick={() => handleItemClick('Chat Ao Vivo')}>
                <hr style={{backgroundColor: selectedItem != 'Chat Ao Vivo' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Chat Ao Vivo' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <ForumIcon sx={{ color: selectedItem === 'Chat Ao Vivo' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Chat Ao Vivo' ? '#407BFF' : '#5C5F62' }}>Chat Ao Vivo</p>
            </SideBarItem>
            {isAdmin && (
            <>
                <SideBarItem href='/user-analityc' onClick={() => handleItemClick('User Analytics')}>
                <hr style={{backgroundColor: selectedItem != 'User Analytics' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'User Analytics' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <AnalyticsIcon sx={{ color: selectedItem === 'User Analytics' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'User Analytics' ? '#407BFF' : '#5C5F62' }}>User Analytics</p>
                </SideBarItem>

                <SideBarItem href='/insta' onClick={() => handleItemClick('Insta Analytics')}>
                <hr style={{backgroundColor: selectedItem != 'Insta Analytics' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Insta Analytics' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <InstagramIcon sx={{ color: selectedItem === 'Insta Analytics' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Insta Analytics' ? '#407BFF' : '#5C5F62' }}>Insta Analytics</p>
                </SideBarItem>
            </>
            )}
        </SideBarList>
        </Container>
    );
}

export default SideBar;




