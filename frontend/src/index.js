import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/context/AuthContext';
import { AvatarUpdateProvider } from './components/context/AvatarUpdateContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <AuthProvider>
        <AvatarUpdateProvider>
          <App />
        </AvatarUpdateProvider>
      </AuthProvider>
    </BrowserRouter>
);
