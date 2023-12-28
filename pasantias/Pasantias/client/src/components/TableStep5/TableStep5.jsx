// importaciones 
import React, {useState} from 'react'
import axios from 'axios';
import './TableStep5.css'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs  from 'dayjs';
import Button from '@mui/material/Button';
// import background from './background.svg';
import background from '../../assets/background.svg';

// funcion tabla que muestra el paso 5 de la pasantia
const TableStep5 = () => {

	const [StartDate, setStartDate] = useState(dayjs())
	const [FinalDate, setFinalDate] = useState(dayjs().add(6,"months"))
	const [WeeklyHours, setWeeklyHours] = useState('')
	const [TotalHours, setTotalHours] = useState('')
	const [Functions, setFunctions] = useState('')

	// funcion que se ejecuta al presionar el boton de guardar
	const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/paso2_save',
                {"StartDate": StartDate, "FinalDate": FinalDate, "WeeklyHours": WeeklyHours, "TotalHours": TotalHours, 
				 "Functions": Functions},

                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
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

	return (

		// seccion de la tabla completa, aqui de definen todos los campos que se muestran en dicha tabla
		// <div style={{backgroundColor: '#211f1f',minHeight: "100vh"}}>
		<div style={{         
		backgroundColor: 'white',
        minHeight: '130vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',}}>
		<center>
			<div className = "table5">
			<div>
				<h2 className='title'><b>Inscripción proyecto pasantia</b></h2>
			</div>

			<div> 
			<div className="startarea">
					<b>Acerca del proyecto</b>
					<hr />
				</div>

				<table className ='edges'>
				<tr>
					<th className="left"></th> <LocalizationProvider dateAdapter={AdapterDayjs}>
							<td style={{paddingTop: "10px", paddingRight: "10px", paddingBottom: "20px"}}>       
								<DatePicker label="Fecha Inicio" format="DD/MM/YYYY" value={StartDate} onChange={(e) => setStartDate (e)} />
							</td>

					<th className="right"></th>
							<td style = {{paddingTop: "10px", paddingRight: "10px", paddingBottom: "20px"}}>
								<DatePicker label="Fecha Fin" format="DD/MM/YYYY" value={FinalDate} onChange={(e) => setFinalDate (e)} />
							</td>
					</LocalizationProvider></tr>
                    
					<tr><th className="left"></th>
						<td style={{paddingTop: "10px", paddingRight: "10px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Horas Semanales:" variant="outlined" helperText="" fullWidth 
							value={WeeklyHours} onChange={(e) => setWeeklyHours (e.target.value)} />	
						</td> <th className="right" ></th>

						<td style={{paddingTop: "10px", paddingRight: "10px", paddingBottom: "20px"}}>     
							<TextField id="outlined-basic" label="Horas Totales:" variant="outlined" helperText="" fullWidth
							value={TotalHours} onChange={(e) => setTotalHours (e.target.value)} />
						</td> 
					</tr>

					<tr className="rowItem">
						<th className="izq"></th>
						<td colSpan="3" style = {{paddingTop: "10px", paddingRight: "10px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Funciones:" variant="outlined" fullWidth inputProps={{style: {fontSize: 16}}} 
							value={Functions} onChange={(e) => setFunctions (e.target.value)} />
						</td>
					</tr>
				</table>

				<Button style={{marginTop: "10px"}} variant="contained" onClick={handleSubmit}>Enviar</Button>
				
				<table cellPadding="0" cellSpacing="0" width="100%">
				</table>

			</div>
			</div>
		</center>
		</div>
	)
}

export default TableStep5