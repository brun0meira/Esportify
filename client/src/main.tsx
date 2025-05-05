import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router} from 'react-router-dom';
import { setAuthorizationHeader } from './axios';

const token = localStorage.getItem('access_token');
if (token) {
  setAuthorizationHeader(token);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>,
)