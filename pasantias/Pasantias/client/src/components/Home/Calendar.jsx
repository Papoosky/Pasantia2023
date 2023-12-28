import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./Calendar.css"
import fechas from "./fechas.json"
import dayjs from 'dayjs';

// import AppBar from '@mui/material/AppBar';
// import "./Footer.css"


const Calendar = () => {
    
const [seleccion, setSeleccion] = React.useState(dayjs());


const handleClick = async(fecha) => {
    setSeleccion(dayjs(fecha.Fecha, "DD/MM/YYYY"));
    console.log("fecha");
    console.log(fecha.Fecha);
    console.log(dayjs(fecha.Fecha, "DD/MM/YYYY"));
  };

return(
    <div className='fechasContainer'>
        <div className='info'>
            {fechas.map((fecha, index) => (
                    <div className='infochild' key={index} onClick={() => handleClick(fecha)}>
                        {/* <a  onClick={() => handleClick(fecha)}> */}
                            {/* {console.log((fecha.Fecha))} */}
                            <h3>{fecha.Nombre}</h3>
                            <p>{fecha.Fecha}</p>
                            <p>{fecha.Descripcion}</p>
                        {/* </a> */}
                    </div>
            ))}


        </div>
        <div className='calendario'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                format="DD/MM/YYYY"
                value = {seleccion}
                onChange={(newValue) => setSeleccion(newValue)}
                />
            </LocalizationProvider>
        </div>
    </div>
    );
}

export default Calendar