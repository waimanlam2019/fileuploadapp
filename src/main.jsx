import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_X7NKCtXSZ",
  client_id: "2dsvb0pp65uk4tksl6j1qi70s7",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "phone openid email",
};


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
