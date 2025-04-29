import React from 'react'; // <--- make sure you import useState
import { useAuth } from "react-oidc-context";
import './App.css';

import FileUpload from './FileUpload.jsx';

function App() {
  // 🧠 Here is where you put it
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "2dsvb0pp65uk4tksl6j1qi70s7";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain = "https://us-east-1x7nkctxsz.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <FileUpload accessToken={auth.user?.access_token} />
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
