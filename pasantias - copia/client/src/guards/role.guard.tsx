import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { PrivateRoutes, PublicRoutes } from '../models/routes.ts';
import {Roles} from '../models/roles.ts'
import { AppStore } from '../redux/store';

// definimos la interfaz de las props
interface Props {
  role: Roles;
}
// componentente RoleGuard que recibe como prop un string que indica el rol que puede acceder a la ruta y retorna el fragmento de ruta correspondiente 
function RoleGuard({ role }: Props) {
  const userState = useSelector((store: AppStore) => store.user);
  return role.includes(userState.role) ? <Outlet /> : <Navigate replace to='/' />; //TODO:volver a revisar la logica de '/'  
}
export default RoleGuard;