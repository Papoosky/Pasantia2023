import "./Login.css";
import { createUser } from '../../redux/states/user.ts';
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';

const Login = () => {
  const [errMsg, setErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Submitting login credentials: ${email}, ${password}`);

    try {
      const response = await axios.post('http://localhost:5000/login',
        { "email": email, "password": password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(JSON.stringify(response?.data));
      dispatch(createUser({ ...response.data }))
      setErrMsg('Login Successful');
      if (response.data.role === 'Admin') {
        navigate('/private/dashboard')
      }
      else if (response.data.role === 'Student') {
        navigate(`/private/step${response.data.step}`)
      }
      else if (response.data.role === 'Supervisor') {
        navigate(`/private/supervisor`)
      }
      else if (response.data.role === 'Professor') {
        navigate(`/private/profesor`)
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        console.log("No Server Response1");
        console.log(err);
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
        console.log("No Server Response2");
      } else {
        setErrMsg('Registration Failed')
        console.log("No Server Response3");
      }
    }
    console.log(errMsg)
  }

  return (
    <Box
    sx={{
      backgroundImage: "url('/Fondo_UAI.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)',
    }}>

    <Container className="input-container">
      <div className="centered-content">
        <div className="input-logo">
          <img src = "/logo-white.png" alt="Logo" width="250px" ></img>

        </div>
        <form className="input-form">
          <Typography variant="h1" style={{ color: 'white'}}>Inicio de sesión</Typography>

          <div className="form-item">
            <TextField
              type="text"
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              sx={{ input: { color: 'white' } }}
            />
          </div>

          <div className="form-item">
            <TextField
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              sx={{ input: { color: 'white' } }}
            />
          </div>

          <div className="form-button">
            <Button type="submit" className="button" variant="contained" style={{backgroundColor : '#05aeef'}} onClick={handleSubmit}>Iniciar sesión</Button>
          </div>
        </form>
      </div>
      </Container>
      </Box>
  );
}

export default Login;
