import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./Calendar.css"
import Calendar from "./Calendar"
import Entregas from "./Entregas"
import background from '../../assets/background.svg';


// import AppBar from '@mui/material/AppBar';
// import "./Footer.css"


const Home = () => {

    return (
        <div className="home" style={{backgroundColor: 'white',
        minHeight: '150vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',}}>
            <Calendar/>
            <Entregas/>
        </div>
        );
    }
    
export default Home;