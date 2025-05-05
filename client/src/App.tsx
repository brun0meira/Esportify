import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import News from './pages/News';
import ExclusiveContent from './pages/ExclusiveContent';
import Escalacao from './pages/Escalacao';
import UserAnalityc from './pages/UserAnalityc';
import Perfil from './pages/Perfil';
import Insta from './pages/Insta';
import { Toaster } from 'react-hot-toast';
import { ChatProvider } from './services/ChatProvider';
import ChatPage from './pages/ChatPage/ChatPage';
import ChatBot from './pages/ChatBot/chatBot';


import { setAuthorizationHeader } from './axios';

const token = localStorage.getItem('access_token');
if (token) {
  setAuthorizationHeader(token);
}

function App() {
	return (
		<ChatProvider>
			<Toaster />
			<Routes>
				<Route path="/" element={<Welcome />} />
        		<Route path="/home" element={<Home />} />
				<Route path="/news" element={<News />} />
				<Route path="/escalacao" element={<Escalacao />} />
				<Route path="/exclusive-content" element={<ExclusiveContent />} />
				<Route path="/user-analityc" element={<UserAnalityc />} />
				<Route path="/perfil" element={<Perfil />} />
				<Route path="/insta" element={<Insta />} />
				<Route path="/chat" element={<ChatPage />} />
				<Route path="/chatbot" element={<ChatBot />} />
			</Routes>
			<GlobalStyles />
		</ChatProvider>
	);
}

export default App;