import React, { useState } from 'react';
import { useContext } from 'react';
import { Container, BackgroundImage, FormsContainer, LoginContainer, ButtonContainer} from './style';
import { Modal, Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { setAuthorizationHeader } from '../../axios';
import UserContext from "../../context/UserContext";
import AuthContext, { AuthProvider } from '../../context/AuthContext';
import Button from '../../components/Button';
import signUpService from '../../services/signup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const INTERESTS = [
    "CS2", "Valorant", "League of Legends", "FURIA Academy", "Watch Parties",
    "Treinamentos ao vivo", "Streamings dos jogadores", "Notícias e bastidores da FURIA",
    "Colecionáveis digitais (NFTs)", "Feminino no esports", "Documentários e vídeos exclusivos",
    "Arena FURIA", "Fantasy game da FURIA"
];

const EVENTS = [
    "IEM Rio Major 2022", "CBLOL Arena 2023", "Arena FURIA São Paulo", "FURIA Fan Fest",
    "ESL Pro League Finals", "DreamHack Open Rio", "Treino aberto da FURIA",
    "Evento de lançamento de uniforme 2024", "Meet & Greet com jogadores",
    "Game XP", "Campus Party", "Showmatch da FURIA com streamers"
];

const PURCHASES = [
    "Camisa oficial da FURIA 2024", "Edição limitada - Jaqueta FURIA x Nike",
    "Mochila personalizada da FURIA", "Mousepad FURIA XL", "Assinatura FURIA+ (conteúdo exclusivo)",
    "Figurinha digital FURIA Legends", "Combo ingresso + camisa para evento", "Boné oficial da FURIA",
    "Chaveiro Pantera", "Sticker da FURIA no CS2", "Skins em parceria com a FURIA", "Coleção Pride Edition"
];

const Welcome: React.FC = () => {
  const [confirmModalConnect, setConfirmModalConnect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  const { setAuthenticated } = useContext(AuthContext);
  const { setLoggedInUserId } = useContext(UserContext);

  // Inicio do cadastro
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [newRg, setNewRg] = useState('');
  const [newState, setNewState] = useState('');
  const [newInterests, setNewInterests] = useState<string[]>([]);
  const [newEventsAttended, setNewEventsAttended] = useState<string[]>([]);
  const [newPurchases, setNewPurchases] = useState<string[]>([]);

  const handleNewEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNewCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCpf(event.target.value);
  };
  
  const handleNewRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRg(event.target.value);
  };

  const handleNewStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewState(event.target.value);
  };

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setList([...list, value]);
    } else {
      setList(list.filter(item => item !== value));
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        const signUpPromise = signUpService.signUp(
            newName,
            newEmail,
            newPassword,
            newCpf,
            newRg,
            newState,
            newInterests,
            newEventsAttended,
            newPurchases
          );
          
          toast.promise(signUpPromise, {
            loading: 'Realizando Cadastro...',
            success: 'Cadastro realizado com sucesso! Já pode fazer login na sua conta!',
            error: 'Erro durante o cadastro, tente novamente',
          });
          
          const response = await signUpPromise;
          
        handleConfirmModalConnect();
    } catch (error) {
        console.error('Login error:', error);
    }
  };

  const handleConfirmModalConnect = () => {
    setConfirmModalConnect(!confirmModalConnect);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        const entityAddressPromise = axios.post('http://localhost:5500/auth/signin', {
            email,
            password
        });
          
        toast.promise(entityAddressPromise, {
            loading: 'Logando na sua conta...',
		    success: 'Login Realizado com sucesso!',
		    error: 'Erro durante o login, provavelmente você não tem uma conta ainda com esse email'
        });
          
        const response = await entityAddressPromise;

        console.log('Login successful:', response.data);
        setEmail('');
        setPassword('');
        const { access_token } = response.data;
        setAuthorizationHeader(access_token);
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('admin', (response.data).admin);
        setAuthenticated((response.data).admin);
        setLoggedInUserId((response.data).userId);
        navigate("/home", { replace: true })
    } catch (error) {
        console.error('Login error:', error);
    }
  };

  return (
    <Container>
        <BackgroundImage></BackgroundImage>
        <FormsContainer>
            <LoginContainer>
                <h2>Acessar Conta</h2>
                <h3>Faça login na sua conta utilizando suas credenciais.</h3>
                <form onSubmit={handleEmailSubmit}>
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Senha"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        sx={{ mt: 2 }}
                    />
                    <Button type="submit" style={{ marginTop: '20px', backgroundColor: 'black', color:'black' }} icon={<LoginIcon />}>
                        Entrar
                    </Button>
                </form>
                <p>Não tem uma conta? <a onClick={handleConfirmModalConnect}>Criar Conta</a></p>
            </LoginContainer>
        </FormsContainer>
        <Modal
            open={confirmModalConnect}
            onClose={handleConfirmModalConnect}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

                // Estiliza a scrollbar
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
                    Criar Conta na FURIA!
                </Typography>
                <form onSubmit={handleSignUp}>
                    <TextField
                        fullWidth
                        type="email"
                        label="Digite seu email"
                        variant="outlined"
                        value={newEmail}
                        onChange={handleNewEmailChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirme sua senha"
                        variant="outlined"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <TextField
                        fullWidth
                        type="name"
                        label="Digite seu nome completo"
                        variant="outlined"
                        value={newName}
                        onChange={handleNewNameChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <TextField
                        fullWidth
                        type="cpf"
                        label="Digite seu CPF (Somente números)"
                        variant="outlined"
                        value={newCpf}
                        onChange={handleNewCpfChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <TextField
                        fullWidth
                        type="rg"
                        label="Digite seu RG (Somente números)"
                        variant="outlined"
                        value={newRg}
                        onChange={handleNewRgChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <TextField
                        fullWidth
                        type="state"
                        label="Digite seu Estado (Somente sigla)"
                        variant="outlined"
                        value={newState}
                        onChange={handleNewStateChange}
                        required
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'white',
                              },
                              '&:hover fieldset': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'white',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel sx={{ color: 'white', fontSize: '20px' }} component="legend">Temas que mais te interessam:</FormLabel>
                        <FormGroup>
                        {INTERESTS.map((interest) => (
                            <FormControlLabel
                            key={interest}
                            control={
                                <Checkbox
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                      color: 'white',
                                    },
                                }}
                                checked={newInterests.includes(interest)}
                                onChange={handleCheckboxChange(newInterests, setNewInterests, interest)}
                                />
                            }
                            label={interest}
                            />
                        ))}
                        </FormGroup>
                    </FormControl>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel sx={{ color: 'white' }} component="legend">Eventos que você participou:</FormLabel>
                        <FormGroup>
                        {EVENTS.map((event) => (
                            <FormControlLabel
                            key={event}
                            control={
                                <Checkbox
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                      color: 'white',
                                    },
                                }}
                                checked={newEventsAttended.includes(event)}
                                onChange={handleCheckboxChange(newEventsAttended, setNewEventsAttended, event)}
                                />
                            }
                            label={event}
                            />
                        ))}
                        </FormGroup>
                    </FormControl>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel sx={{ color: 'white' }} component="legend">Compras que você já fez:</FormLabel>
                        <FormGroup>
                        {PURCHASES.map((purchase) => (
                            <FormControlLabel
                            key={purchase}
                            control={
                                <Checkbox
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                      color: 'white',
                                    },
                                }}
                                checked={newPurchases.includes(purchase)}
                                onChange={handleCheckboxChange(newPurchases, setNewPurchases, purchase)}
                                />
                            }
                            label={purchase}
                            />
                        ))}
                        </FormGroup>
                    </FormControl>
                    <Button type="submit" style={{ marginTop: '20px' }} icon={<AssignmentTurnedInIcon />}>
                        Cadastrar-se
                    </Button>
                </form>
            </Box>
        </Modal>
    </Container>
  );
}

export default Welcome;