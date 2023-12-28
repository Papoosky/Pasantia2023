import React from 'react'
import { DataGrid,useGridApiRef  } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useEffect} from 'react';
import './Dashboard.css'
import axios from 'axios';
import {IoMdArrowDroprightCircle,IoMdArrowDropdownCircle} from 'react-icons/io';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

export const AceptStep2 = () => {

    const [students, setStudents] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [infoStudent, setInfoStudent] = useState([]);

    const toggleExpand = async () => {
      setIsExpanded(!isExpanded);
      if (isExpanded) return; // Si ya está expandido, no se realiza la llamada nuevamente
      await getStudents();
    };

    const getStudents = async () => {
        const res = await axios.post('http://localhost:5000/get_students',
        {step : '4'},
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        setStudents(res.data);
        console.log(students)
    }

    const apiRef = useGridApiRef();

    const handleApprove = async() => {
        const selectedRows = apiRef.current.getSelectedRows();
        for (const row of selectedRows) {
            try {
            console.log(row[1].id)
              await axios.post('http://localhost:5000/updatestep', 
              {'email': row[1].id, 'step': 5}, // el valor deseado para el campo 'step'
              {
                headers: { 'Content-Type': 'application/json'}
              }
            
              );
              
              // Actualizar el estado local o realizar cualquier otra acción necesaria
              // después de que se haya actualizado el 'step' en el backend para un estudiante seleccionado.
              console.log(`Step actualizado para el estudiante con id: ${row[1].id}`);
            } catch (error) {
              console.log(`Error al actualizar el step para el estudiante con id: ${row[1].id}`);
              // Manejar el error según sea necesario
            }
          }

        console.log('Alumnos aprobados:', selectedRows);
        window.location.reload();
      };
    const handleReject = () => {
        // Lógica para rechazar a los alumnos seleccionados
        const selectedRows = apiRef.current.getSelectedRows();
        console.log('Alumnos rechazados:', selectedRows);
      };

      const [open, setOpen] = useState(false);
      const handleClose = () => setOpen(false);
  
      const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#191919',
        border: '2px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
      };

      const getInfo = (id) => async() => {
        try {
            setOpen(true) 
            const res = await axios.post('http://localhost:5000/get_student_info',
            {'id' : id},
            {
                headers: { 'Content-Type': 'application/json' }
            }
            );
            setInfoStudent(res.data);
        } catch (error) {
            console.log(`Error al obtener la información del estudiante con id: ${id}`);
            // Manejar el error según sea necesario
        }
      }

      const getFieldName = (key) => {
        const fieldNames = {
          area: 'Area',
          description: 'Descripción',
          f_entry: 'Fecha de entrada',
          f_sent: 'Fecha de envío',
          f_verification: 'Fecha de verificación',
          finish_date : 'Fecha de término',
          functions: 'Funciones',
          paid : 'Pago',
          start_date : 'Fecha de inicio',
          total_hours : 'Horas totales',
          weekly_hours : 'Horas semanales'
          
        };
        return fieldNames[key] || key;
      };
      const fieldOrder = [
        'start_date',
        'finish_date',
        'area',
        'description',
        'functions',
        'paid',
        'total_hours',
        'weekly_hours',
        'f_entry',
        'f_sent',
        'f_verification'
      ];

      const renderModalButton = (params) => {
        return (
          <>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={getInfo(params.row.id)}
            >
              Información
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
              Información del estudiante:
            </Typography>
            {infoStudent.map((info, index) => (
              fieldOrder.map((field) => (
                <Typography key={index + field} id="modal-modal-description" sx={{ mt: 2 }} color="white">
                  {getFieldName(field)}: {info[field]}
                </Typography>
              ))
            ))}
              
            </Box>
            </Modal>


          </>
        );
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'rut', headerName: 'Rut', width: 130 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 250},
        { field: 'modal', headerName: 'Modal', width: 130, renderCell: renderModalButton },
        ];


        return (
          <>
            <div className='container-grid'>
              <div className='toggle-button' onClick={toggleExpand}>
                <div>
                  Revisar estudiantes que inscribieron una pasantía
                  {isExpanded ? <IoMdArrowDropdownCircle /> : <IoMdArrowDroprightCircle />}
                </div>
              </div>
              {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 'rem' }}>
                  <DataGrid
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                      },
                    }}
                    rows={students}
                    columns={columns}
                    apiRef={apiRef}
                    disableColumnFilter={false}
                    headerHeight={56}
                  />
                  <div style={{ padding: '1rem', margin: "auto" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApprove}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleReject}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        );
}