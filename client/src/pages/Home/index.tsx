import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, EventCard, Header, MonthSelector, EventList, Filters, HeaderContent } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { events, Event } from './events';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import furia_logo from '../../assets/Furia_Esports_logo.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Modal, Box, TextField, Typography } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../../components/Button';
import SavingsIcon from '@mui/icons-material/Savings';

const months = [
  { id: 1, name: 'JAN' },
  { id: 2, name: 'FEV' },
  { id: 3, name: 'MAR' },
  { id: 4, name: 'ABR' },
  { id: 5, name: 'MAI' },
  { id: 6, name: 'JUN' },
  { id: 7, name: 'JUL' },
  { id: 8, name: 'AGO' },
  { id: 9, name: 'SET' },
  { id: 10, name: 'OUT' },
  { id: 11, name: 'NOV' },
  { id: 12, name: 'DEZ' },
];

const Home: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(5);
  const [confirmModalConnect, setConfirmModalConnect] = useState(false);

  const filteredEvents = events.filter(
    (event) => new Date(event.date).getMonth() + 1 === selectedMonth
  );

  const handleConfirmModalConnect = () => {
    setConfirmModalConnect(!confirmModalConnect);
  };

  const handleBet = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      handleConfirmModalConnect();
    } catch (error) {
        console.error('Login error:', error);
    }
  };

  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Proximos Eventos e Partidas da <span>FURIA!</span></h1>
              <h2>Fique por dentro de todos os eventos e partidas da Nação FURIA — não perca nenhum momento!</h2>
            </HeaderContent>
            <Header>
              <button onClick={() => setSelectedMonth((prev) => Math.max(prev - 1, 1))}>{<ArrowBackIosIcon />}</button>
              <h1>2025</h1>
              <button onClick={() => setSelectedMonth((prev) => Math.min(prev + 1, 12))}>{<ArrowForwardIosIcon />}</button>
            </Header>
            <MonthSelector>
              {months.map((month) => (
                <div
                    key={month.id}
                    className={month.id === selectedMonth ? 'active' : ''}
                    onClick={() => setSelectedMonth(month.id)}>
                  <span>
                    {month.id}
                  </span>
                  <p>{month.name}</p>
                </div>
              ))}
            </MonthSelector>
            {filteredEvents.map((event) => {
              const dayOfWeek = new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long' });
              const day = new Date(event.date).getDate();
              return (
                <EventList key={event.id}>
                  <h2>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} | {monthName(event.date)} {day}</h2>
                  <EventCard>
                    <div>
                      <p>{event.time}</p>
                    </div>
                    <div>
                      <img src={furia_logo} alt="logo" width={50} />
                      <p>{event.title} - {event.dayNumber}</p>
                    </div>
                    <Filters>
                      <button>VOD</button>
                      <button>RESULTADO</button>
                      <button onClick={handleConfirmModalConnect}>APOSTAR PONTOS FURIOSOS</button>
                    </Filters>
                  </EventCard>
                </EventList>
              );
            })}
        </ContentContainer>
        <Modal
            open={confirmModalConnect}
            onClose={handleConfirmModalConnect}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            <Box p={3} sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 2,
                p: 3,
                width: '100%',
                maxWidth: 600,
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: 'white',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'black',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#666',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#888',
                },
            
                scrollbarWidth: 'thin',
                scrollbarColor: '#666 black',
             }}>
                <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{color: '#ffeb00', fontSize: '24px', fontWeight:'bold'}}>
                    Apostar seu Pontos Furiosos na Partida!
                </Typography>
                <form onSubmit={handleBet}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel
                    htmlFor="filled-adornment-amount"
                    sx={{ color: 'white' }}
                  >
                    Amount
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    startAdornment={<InputAdornment position="start"><SavingsIcon sx={{color:'white'}}></SavingsIcon></InputAdornment>}
                    sx={{
                      mt: 2,
                      color: 'white',
                      backgroundColor: 'transparent',
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '&:before': {
                        borderBottomColor: 'white',
                      },
                      '&:hover:before': {
                        borderBottomColor: 'white',
                      },
                      '&:after': {
                        borderBottomColor: 'white',
                      },
                    }}
                  />
                </FormControl>
                    <FormGroup>
                      <FormControlLabel required control={<Checkbox sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                          color: 'white',
                                        },
                                    }} />} label="Entendo que esse valor será creditado dos meus Pontos" />
                    </FormGroup>
                    <Button type="submit" style={{ marginTop: '20px' }} icon={<PriceCheckIcon />}>
                        Finalizar Aposta
                    </Button>
                </form>
            </Box>
        </Modal>
    </Container>
  );

  function monthName(date: string) {
    return new Date(date).toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
  }
}

export default Home;