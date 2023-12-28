import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import './Profesor.css'
import axios from 'axios';
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
import { display } from '@mui/system';
import background from '../../assets/background.svg';

export const Profesor = () => {
  const [name, setName] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const toggleExpand = async (courseId) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, isExpanded: !course.isExpanded } : course
      )
    );
  
    const course = courses.find(course => course.id === courseId);
    if (course && !course.isExpanded) {
      const studentslist = await getCoursesStudents(courseId);
      setStudents(studentslist);
    }
  };

  const getName = () => {
    setName(userInfo.name);
  };

  const getCourses = async () => {
    const res = await axios.post(
      'http://localhost:5000/get_courses',
      { Id_Professor: userInfo.id_professor },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const coursesWithExpansion = res.data.map(course => ({ ...course, isExpanded: false }));
    setCourses(coursesWithExpansion);
  };

  const getCoursesStudents = async (courseId) => {
    const res = await axios.post(
      'http://localhost:5000/get_courses_students',
      { Id_Course: courseId },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return res.data;
  };


  useEffect(() => {
    getName();
    getCourses();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'rut', headerName: 'Rut', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 250},
  ];

  return (
    <div className='profesor-container' style={{backgroundColor: 'white',
    minHeight: '150vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',}}>

      <h2 className='profesor-titulo'>
        Bienvenido profesor {name}
      </h2>
      <div className='profesor-cursos'>
        <h3 className='profesor-subtitulo'>
          Tus cursos:
        </h3>
        <div className='profesor-cursos-container'>
          {courses.map((course) => (
            <div className='profesor-curso' key={course.id}>
              <div style={{display:'flex', alignItems: 'center'}}>
              <h4 className='profesor-curso-titulo'>
                {course.name}
              </h4>
              <div
                className='toggle-button-profesor'
                onClick={() => toggleExpand(course.id)}
                >
                {course.isExpanded ? <IoMdArrowDropdownCircle /> : <IoMdArrowDroprightCircle />}
              </div>
              </div>
              {course.isExpanded && (
                <div className='students-data-grid'>
                  <DataGrid
                    rows={students}
                    columns={columns}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
