// importaciones de librerias
import React, {useState} from 'react'
import './Step0.css'
import rules from "../../assets/Rules/Actual/Rules.pdf";
import { useDispatch } from 'react-redux';
import user, { updateUser } from '../../redux/states/user.ts';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { ThemeContext } from '@emotion/react';

// funcion que muestra el paso 0 de la pasantia
const Step0 = () => {
  const [YESNO, setYESNO] = useState('');

  // funcion que se ejecuta al presionar el boton de enviar
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    console.log('Formulario enviado');
    try {
      const responde = await axios.post('http://localhost:5000/updatestep',
        { "email": userInfo.id_user,"step": 1 },
        {
          headers: { 'Content-Type': 'application/json'}
        }
      );
      console.log(JSON.stringify(responde?.data));
      dispatch(updateUser({ step: 1 }));
      window.location.href = '/private/step1';

      
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
        console.log("No Server Response1");
        console.log(err);
      } else if (err.response?.status === 409) {
        console.log('Failed');
        console.log("No Server Response2");
      } else {
        console.log('Failed')
        console.log("No Server Response3");
      }
    }
    
  };

	return (

    // codigo html del paso 0 para poder ver el reglamento de la pasantia (pdf)
    <>
      <div className='edge'>
        <div className='centered1'>
          <embed src={rules} width="600" height="600" type="application/pdf" />
        </div>
      </div>
      <div className='centered2'>
        <FormControl>
          <RadioGroup row aria-labelledby="demo-form-control-label-placement" name="position" defaultValue="top" onChange={(e) => setYESNO(e.target.value)}>
            <FormControlLabel style={{ paddingLeft: "20px" }} value="Si" control={<Radio />} label="Sí" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px"}}>
          <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
        </div>
      </div>
    </>

      );
    }

export default Step0