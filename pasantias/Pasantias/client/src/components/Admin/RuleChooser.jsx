import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import {IoMdArrowDroprightCircle,IoMdArrowDropdownCircle} from 'react-icons/io';
// import "../Dashboard/Dashboard.css"
const RuleChooser = () => {

	const [Rules, setRules] = useState([])
	const [Actual, setActual] = useState('')
	const [Replacing_file, setReplacing_file] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = async () =>  {
        setIsExpanded(!isExpanded);
        if (isExpanded) return; // Si ya está expandido, no se realiza la llamada nuevamente
        await get_rules();
        await get_actual();
      
    };
    
        async function get_rules() {
            try {
                const response = await axios.get('http://localhost:5000/get_rules',
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                // console.log(JSON.stringify(response?.data));
                setRules(response?.data)
            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 409) {
                    console.log('Username Taken');
                } else {
                    console.log('Registration Failed')
                }
            }
        }
        async function get_actual() {
            try {
                const response = await axios.get('http://localhost:5000/get_actual_rules',
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                // console.log(JSON.stringify(response?.data)); // esto entrega "/app/Reglamentos/Actual/ayuda.pdf"
                setActual(response?.data.split("/").pop()) // Con esto obtenemos ayuda.pdf
            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 409) {
                    console.log('Username Taken');
                } else {
                    console.log('Registration Failed')
                }
            }
        }

      const handleSubmit = async (e) => {
        e.preventDefault();
        //Una vez seleccionado el archivo a cambiar, se envia al backend para que se cambie
        try {
            const response = await axios.post('http://localhost:5000/change_rules',
                {replacing_file : Replacing_file },
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            // console.log(JSON.stringify(response?.data));
            await get_rules(); //Actualizamos la lista de reglamentos
            await get_actual(); //Actualizamos el reglamento actual
            setReplacing_file(''); //Reseteamos el valor del archivo a cambiar
            //console.log(JSON.stringify(response))
            // setSuccess(true);
         
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 409) {
                console.log('Username Taken');
            } else {
                console.log('Registration Failed')
            }
        }
    }

return(
    <>
    <div className='container-grid'>
        <div className='toggle-button' onClick={toggleExpand}>
            <div>
                Cambiar reglamento actual
                {isExpanded ? <IoMdArrowDropdownCircle /> : <IoMdArrowDroprightCircle />}
            </div>
        </div>
    </div>
    {isExpanded && (
        <div className = "Admin-Dashboard" style={{display:'flex', flexDirection: 'column'}}>
        <h1>Cambio de reglamento</h1>

            <FormControl required margin='normal'>
                <InputLabel htmlFor="grouped-native-select">Pdf para cambiar</InputLabel>
                <Select value={Replacing_file} onChange={(e) => setReplacing_file(e.target.value)}>
                    {Rules.map((item) => (
                        <MenuItem key={item} value={item}>
                        {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        <h2>Reglamento Actual:</h2>
        <p>{Actual}</p>
        {/* <button onClick={handleSubmit} style={{marginTop:"10px"}} >Enviar</button> */}
        <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    style={{alignItems:'center', marginTop:'10px'}}>
                    Enviar
        </Button>
    </div>
    )}
</>
);

}

export default RuleChooser