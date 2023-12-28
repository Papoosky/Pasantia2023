import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Supervisor.css'
import background from '../../assets/background.svg';

export const Supervisor = () => {
    const [studentname, setStudentname] = useState([]);
    const [f_accepts, setF_accepts] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('user'));

    const get_flag_supervisor = async () => {
        console.log(userInfo.id_user);
        const res = await axios.post('http://localhost:5000/get_flag_supervisor',
            {id_user : userInfo.id_user},
            {
            headers: { 'Content-Type': 'application/json' }
            }
        );
        setF_accepts(res.data);

    }
    console.log(f_accepts.flag)

    const get_student_name = async () => {
        const res = await axios.post('http://localhost:5000/get_student_name',
            {id_internship : userInfo.id_internship},{
            headers: { 'Content-Type': 'application/json' }
            }
        );
        setStudentname(res.data);
    }

    useEffect(() => {
        get_flag_supervisor();
        get_student_name();
    }, [])

    const handleAccept = async () => {
        try {
            const res = await axios.post('http://localhost:5000/accept_supervisor',
            {id_user : userInfo.id_user},
            {
                headers: { 'Content-Type': 'application/json' }
            }
            );
            console.log(res.data);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        try {
            console.log('entre al segundo try');
            const responde = await axios.post('http://localhost:5000/updatestepsupervisor',
              {'step': 4, 'id_internship': userInfo.id_internship },
              {
                headers: { 'Content-Type': 'application/json'}
              }
            );
            console.log(JSON.stringify(responde?.data));
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
    {f_accepts.flag == 0 ? (
        <div className='supervisor-container'>
            <p className='supervisor-texto'>
            El alumno {studentname.nombre} {studentname.apellido} te ha seleccionado como su supervisor para la pasantía. Por favor, acepta para seguir con el proceso.
            </p>
                <div>
                    <button className='supervisor-button' onClick={handleAccept}>
                        Aceptar
                    </button>
                    <button className='supervisor-button'>
                        Rechazar
                    </button>
            </div>
        </div>
        ):(
            <div></div>
        )
        }


    </>
  )}
    