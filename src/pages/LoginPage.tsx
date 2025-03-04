import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import assets from '../assets';
import { Button, Snackbar } from '@mui/material';
const LoginPage = () => {
  const [login, setlogin] = useState('');
  const [mdp, setmdp] = useState('');
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
/* login = 000333  mdp = znGRQZfcjpbtKs+YTxOl1w==*/
  const handleLogin = async () => {
    if(login==='' || mdp===''){
        setEmpty(true);
        setTimeout(() => {
          setEmpty(false);
        }, 2000); return true;
    }
    try {
        
      const response = await axios.post('https://localhost:7113/api/Login/login', { login, mdp });
      localStorage.setItem('token', response.data.token);
     
      window.location.href = '/Employés/Liste-des-employes';
      console.log(response)
    } catch (error) {
      
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      
    }
  };

  return (
   <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"3rem",height:"80dvh"}}>
    <div>
    <img src={assets.images.logoAuto} width="300px" style={{borderRight:"1.5px solid"
                    ,borderImage:"linear-gradient(to bottom, white, grey, white) 1"}}/>
    
        </div>
       

    <div style={{  display: 'flex', flexDirection: 'column', width: '35%' }}>
   
      <div style={{ marginBottom: '1rem' }}>
      <Snackbar open={error} autoHideDuration={2000}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          Identifiants invalides
        </Alert>
      </Snackbar>
      <Snackbar open={empty} autoHideDuration={2000}>
        <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
          Veuillez Entrer vos informations de connexion
        </Alert>
      </Snackbar>
        <label htmlFor="login">Nom d'utilisateur</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={(e) => setlogin(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="mdp">Mot de passe</label>
        <input
          id="mdp"
          type="password"
          value={mdp}
          onChange={(e) => setmdp(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>
      <Button variant="outlined" onClick={handleLogin} sx={{color:"#000",borderColor:"black" ,'&:hover': {
            borderColor: '#000',backgroundColor:"transparant"
          }}} >Se connecter</Button>

     
    </div>
  </div>
  );
};

export default LoginPage;
