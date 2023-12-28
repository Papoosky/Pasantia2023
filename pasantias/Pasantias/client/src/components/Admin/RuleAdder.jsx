import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios';
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import {IoMdArrowDroprightCircle,IoMdArrowDropdownCircle} from 'react-icons/io';
// import "../Dashboard/Dashboard.css"
const RuleAdder = () => {

	const [Upload, setUpload] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        //Una vez seleccionado el archivo a cambiar, se envia al backend para que se cambie
        try {
            const formData = new FormData();
            formData.append('file', Upload);

            const response = await axios.post('http://localhost:5000/upload_rules',
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    // withCredentials: true
                }
            );
    
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
            Añadir reglamento
            {isExpanded ? <IoMdArrowDropdownCircle /> : <IoMdArrowDroprightCircle />}
        </div>
    </div>
    </div>

    {isExpanded && (

    <div className = "Admin-Dashboard" >
        <h1>Subir un reglamento</h1>
        <div style={{display:'flex', flexDirection: 'column', width: '100%', padding:'rem'}}>
            <TextField
            name="upload-photo"
            type="file"
            onChange={(e) => setUpload(e.target.files[0])}
            />
            <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    style={{alignItems:'center', marginTop:'10px'}}>
                    Enviar
            </Button>
        </div>
    </div>
    )}
    </>

  );

}

export default RuleAdder