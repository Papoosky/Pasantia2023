import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./Calendar.css"
import notas from "./notas.json"
import dayjs from 'dayjs';

// import AppBar from '@mui/material/AppBar';
// import "./Footer.css"


const Entregas = () => {


    return(
        <div className="fechasContainer">
            <div className='info'>
                {notas.map((entrega, index) => (
                        <div className='infochildEntregas' key={index} 
                        // onClick={() => handleClick(entrega)}
                        >
                                <h3>{entrega.Nombre}</h3>
                                <p>{entrega.Fecha}</p>
                                <p>{entrega.Nota}</p>
                                <p>{entrega.Feedback}</p>
                        </div>
                ))}

 
            </div>
        </div>
    )

}

export default Entregas;