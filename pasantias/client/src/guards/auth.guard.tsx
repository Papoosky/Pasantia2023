import React from "react";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../models/routes.ts"
import { AppStore } from "../redux/store"

// definimos la interfaz de las props
interface Props{
    privateValidation: boolean;
}
// definimos los fragmentos de rutas privadas y publicas
const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

// componente AuthGuard que recibe como prop un booleano que indica si la ruta es privada o publica y retorna el fragmento de ruta correspondiente
export const AuthGuard = ({privateValidation} : Props) => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.email ? (
        privateValidation? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    ) : (
    <Navigate replace to= {PublicRoutes.LOGIN}/>
    );
};

export default AuthGuard