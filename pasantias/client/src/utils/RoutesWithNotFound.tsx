import { Route, Routes } from 'react-router-dom';
import React from 'react';
// definimos la interfaz de las props
interface Props {
  children: JSX.Element[] | JSX.Element;
}
// componente RoutesWithNotFound que recibe como prop un elemento o un array de elementos y retorna not found si no encuentra la ruta
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
export default RoutesWithNotFound;