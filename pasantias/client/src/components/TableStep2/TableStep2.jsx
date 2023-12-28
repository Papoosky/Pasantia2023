// Importaciones de librerias externas
import React, {useState,} from 'react'
import axios from 'axios';
import './TableStep2.css'
import TextField from '@mui/material/TextField';
import CountrySelect from '../Countries/CountrySelect';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs  from 'dayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import background from '../../assets/background.svg';
import { useDispatch } from 'react-redux';
import user, { updateUser } from '../../redux/states/user.ts';
import emailjs from 'emailjs-com';
// funcion tabla que muestra el paso 2 de la pasantia
const TableStep2 = () => {
  
	const [Name, setName] = useState('')
	const [Rut, setRut] = useState('')
	const [Area, setArea] = useState('')
	const [Country, setCountry] = useState({code: "CL", label: "Chile", phone: "56"})
	const [Direction, setDirection] = useState('')
	const [Website, setWebsite] = useState('')
	const [Supervisor, setSupervisor] = useState('')
	const [Charge, setCharge] = useState('')
	const [Phone_Number, setPhone_Number] = useState('')
	const [Cellphone_Number, setCellphone_Number] = useState('')
	const [Job_Title, setJob_Title] = useState('')
	const [Mail, setMail] = useState('')
	const [Paid, setPaid] = useState('')
	const [Start_Date, setStart_Date] = useState(dayjs())
	const [Finish_Date, setFinish_Date] = useState(dayjs().add(6,"months"))
	const [Weekly_Hours, setWeekly_Hours] = useState('')
	const [Total_Hours, setTotal_Hours] = useState('')
	const [Functions, setFunctions] = useState('')
	const id = useSelector(state => state.user.id_user); //dene ser idstuidjfpaiefmn´fg9h
	const id_student = useSelector(state => state.user.id_student);

	const dispatch = useDispatch();


	const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('user'));
        try {
			console.log(id);
            const response = await axios.post('http://localhost:5000/step2_save',
                {"id_user":id, "Name": Name,"Rut": Rut,"Area": Area,"Country": Country,"Direction": Direction,
				"Website": Website,"Supervisor": Supervisor,"Charge": Charge,"Phone_Number": Phone_Number,
				"Cellphone_Number": Cellphone_Number,"Job_Title": Job_Title,"Mail": Mail,"Paid": Paid,
				"Start_Date": Start_Date,"Finish_Date": Finish_Date,"Weekly_Hours": Weekly_Hours,
				"Total_Hours": Total_Hours,"Functions": Functions,"UserName": userInfo.name, "Id_Student": id_student},

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

		try {
			const responde = await axios.post('http://localhost:5000/updatestep',
			{ "email": userInfo.id_user,"step": 3 },
			{
				headers: { 'Content-Type': 'application/json'}
			}
			);
			console.log(JSON.stringify(responde?.data));
			dispatch(updateUser({ step: 3 }));
			window.location.href = '/private/step3';
	
			
		} catch (err) {
			console.log('No Server Response');	
		}
    }

	return (
		
		// seccion de la tabla completa, aqui de definen todos los campos que se muestran en dicha tabla	
		// <center style={{backgroundColor: '#211f1f'}}>
		<div className='aweonao'>
		{/* <center className='aweonao'> */}
		 <center style={{backgroundColor: 'white',
			minHeight: '100vh',
			backgroundImage: `url(${background})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',}}>

			<div className = "table">
			<div>
				<h2 className='title'><b>Pasantia</b></h2>
			</div>
				<div className="startarea">
					<b>Datos de la empresa</b>
					<hr />
				</div>

				<table className='edges'>
					<br></br>
					<tr>
						<th className='left'>
						</th>	
						<td style={{paddingRight: "35px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic"label="Nombre Empresa:" variant="outlined" helperText="Ej: UAI"
							value={Name} onChange={(e) => setName(e.target.value)} />	
						</td>					
						<td  style={{marginTop: "20px", paddingRight: "35px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic"label="Rut:" variant="outlined" helperText="Ej: 11111111-1"
							value={Rut} onChange={(e) => setRut(e.target.value)} />	
						</td>
					</tr>
				

					<tr>
						<th></th>
						<td className="left" style={{verticalAlign: "top", paddingBottom: "20px"}}>
							 <TextField id="outlined-basic"label="Area:" variant="outlined" helperText="Ej: Operaciones"
							value={Area} onChange={(e) => setArea(e.target.value)} />	
						</td>
						<td style={{marginTop: "20px", verticalAlign: "top", paddingBottom: "20px"}}>
							<CountrySelect value={Country} onChange={setCountry}/>
						</td>
						<td></td>

					</tr>

					<tr>
						<th></th>
						<td colspan="3" style = {{paddingBottom: "20px"}}>
							<TextField label="Direccion:" variant="outlined" helperText="Ej: Dirección particular, comuna, ciudad" fullWidth = "True" 
							value={Direction} onChange={(e) => setDirection(e.target.value)} />
						</td>
					</tr>

					<tr>      
					<th className="left"></th>
						<td colspan="3" style = {{paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Pagina Web:" variant="outlined" helperText="Ej: www.uai.cl" fullWidth = "True"
							value={Website} onChange={(e) => setWebsite(e.target.value)} />	
						</td>
						
					</tr>
				</table>

				<div className="startarea">
				<b>Supervisión</b> 
					<hr/>
				</div>
				<br></br>
				<table className='edges'>

					<tr>
						<th className= "left"></th>
						<td style={{paddingRight: "10px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Supervisor:" variant="outlined" helperText="Ej: Adolfo Ibañez" fullWidth
							value={Supervisor} onChange={(e) => setSupervisor (e.target.value)} />
						</td>
						<th className="right"></th>
						<td style = {{paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Cargo:" variant="outlined" helperText="Ej: Ingeniero Supervisor" fullWidth
							value={Charge} onChange={(e) => setCharge(e.target.value)} />
						</td>
					</tr>

					<tr >
						<th className="left"></th>
						<td style={{paddingRight: "10px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Teléfono:" variant="outlined" helperText="Ej: 221234567" fullWidth
							value={Phone_Number} onChange={(e) => setPhone_Number(e.target.value)} />
						</td>
						<th className="right" ></th>
						<td style = {{paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Celular:" variant="outlined" helperText="Ej: 221234567" fullWidth
							value={Cellphone_Number} onChange={(e) => setCellphone_Number(e.target.value)} />
						</td>
					</tr>

					<tr >
						<th className="left"></th>
						<td style={{paddingRight: "10px", paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Titulo Profesional:" variant="outlined" helperText="Ej: Ingeniero Comercial" fullWidth
							value={Job_Title} onChange={(e) => setJob_Title(e.target.value)} />
						</td>
						<th className="right" ></th>
						<td style = {{paddingBottom: "20px"}}>
							<TextField id="outlined-basic" label="Mail:" variant="outlined" helperText="Ej: xxxx@ejemplo.com" fullWidth
							value={Mail} onChange={(e) => setMail(e.target.value)} />
						</td>
					</tr>
				</table>

				<div className="startarea">
					<b>Acerca de la pasantia</b>
					<hr/>
				</div>

				<br></br>
				<table className ='edges'>
					<tr>
					<th className="left"></th> <LocalizationProvider dateAdapter={AdapterDayjs}>
							<td style={{paddingRight: "10px", paddingBottom: "30px"}}>       
								<DatePicker label="Fecha Inicio" format="DD/MM/YYYY" value={Start_Date} onChange={(e) => setStart_Date(e)} />
							</td>
							<th className="right"></th>
							<td style = {{paddingBottom: "30px"}}>
								<DatePicker label="Fecha Fin" format="DD/MM/YYYY" value={Finish_Date} onChange={(e) => setFinish_Date(e)} />
							</td>
					</LocalizationProvider></tr>

					<tr><th className="left"></th>
						<td style={{paddingRight: "10px", paddingBottom: "30px"}}>
							<TextField id="outlined-basic" label="Horas Semanales:" variant="outlined" helperText="" fullWidth 
							value={Weekly_Hours} onChange={(e) => setWeekly_Hours(e.target.value)} />	
						</td> <th className="der" ></th>
						<td style = {{paddingBottom: "30px"}}>     
							<TextField id="outlined-basic" label="Horas Totales:" variant="outlined" helperText="" fullWidth
							value={Total_Hours} onChange={(e) => setTotal_Hours(e.target.value)} />
						</td> 
					</tr>

					<tr className="rowItem">
						<th className="left"></th>
						<td colspan="3">
							<TextField id="outlined-basic" label="Funciones:" variant="outlined" fullWidth inputProps={{style: {fontSize: 16}}} 
							value={Functions} onChange={(e) => setFunctions(e.target.value)} />
						</td>
					</tr>
					<br></br><br></br>
				</table>
				<FormControl style={{}}>
									<FormLabel id="demo-form-control-label-placement">Es Remunerada</FormLabel>
									<RadioGroup row aria-labelledby="demo-form-control-label-placement" name="position" defaultValue="top" onChange={(e) => setPaid(e.target.value)}>
										<FormControlLabel value= "Si" control={<Radio />} label="Sí" />
										<FormControlLabel value="No" control={<Radio />} label="No"/>
									</RadioGroup>
								</FormControl>
				<br/>
				<br/>
				<Button variant="contained" onClick={handleSubmit}>Enviar</Button>
			</div>
		</center>
		</div>
		)
}

export default TableStep2