import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { PrivateRoutes, PublicRoutes } from '../models/routes.ts';
import { AppStore } from '../redux/store';

// definimos la interfaz de las props
interface Props {
  step: string;
}
// componentente StepGuard que recibe como prop un string que indica el paso que puede acceder a la ruta y retorna el fragmento de ruta correspondiente
function StepGuard({ step }: Props) {
  const userState = useSelector((store: AppStore) => store.user);
  return step.includes(userState.step!) ? <Outlet /> : <Navigate replace to='/' />; //TODO:volver a revisar la logica de '/'  
}
export default StepGuard;