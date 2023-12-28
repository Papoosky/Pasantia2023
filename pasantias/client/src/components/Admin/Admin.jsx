import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import "./Calendar.css"
// import Calendar from "./Calendar"
// import Entregas from "./Entregas"
import background from '../../assets/background.svg';
import {Dashboard} from './Dashboard';
import {AceptStep2} from './AceptStep2';
import RuleChooser from './RuleChooser';
import RuleAdder from './RuleAdder';


// import AppBar from '@mui/material/AppBar';
// import "./Footer.css"


const Admin = () => {

    return (
        <div className="Admin" style={{backgroundColor: 'white',
        minHeight: '150vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',}}>
            <div style={{backgroundColor : "white"}}>
                <Dashboard/>
                <AceptStep2/>
                <RuleChooser/>
                <RuleAdder/>
            </div>

        </div>
        );
    }
    
export default Admin;