import React from 'react'
import { DataGrid,useGridApiRef  } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useEffect} from 'react';
import './Dashboard.css'
import axios from 'axios';
import {IoMdArrowDroprightCircle,IoMdArrowDropdownCircle} from 'react-icons/io';

export const Dashboard = () => {

    const [students, setStudents] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = async () => {
      setIsExpanded(!isExpanded);
      if (isExpanded) return; // Si ya está expandido, no se realiza la llamada nuevamente
      await getStudents();
    };

    const getStudents = async () => {
        const res = await axios.post('http://localhost:5000/get_students',
            {step : '1'},{
            headers: { 'Content-Type': 'application/json' }
            }
            
        );
        setStudents(res.data);
    }

    const apiRef = useGridApiRef();

    const handleApprove = async() => {
      if (apiRef.current){

        const selectedRows = apiRef.current.getSelectedRows();
        for (const row of selectedRows) {
          try {
            console.log(row[1].id)
            await axios.post('http://localhost:5000/updatestep', 
            {'email': row[1].id, 'step': 2}, // el valor deseado para el campo 'step'
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
    }
    const handleReject = () => {
        // Lógica para rechazar a los alumnos seleccionados
        if (apiRef.current){
        const selectedRows = apiRef.current.getSelectedRows();
        console.log('Alumnos rechazados:', selectedRows);
      };
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'rut', headerName: 'Rut', width: 130 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 250},
        ];


        return (
          <>
            <div className='container-grid'>
              <div className='toggle-button' onClick={toggleExpand}>
                <div>
                  Revisar estudiantes que aceptaron el reglamento
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