import './App.css';

import Step0 from './components/Step0/Step0'
import TableStep2 from './components/TableStep2/TableStep2'
import TableStep5 from './components/TableStep5/TableStep5';
import Calendar from './components/Home/Calendar';
import Entregas from  './components/Home/Entregas';
import { Navbar, Login } from './components';
import { Provider } from 'react-redux';
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom';
import store from './redux/store.ts';
import {PrivateRoutes, PublicRoutes}  from './models/routes.ts';
import AuthGuard from './guards/auth.guard.tsx';
import Private from './private/Private';
import RuleChooser from './components/Admin/RuleChooser';
import  Footer  from './components/Footer/Footer';
import RuleAdder from './components/Admin/RuleAdder';
import Home from './components/Home/Home';
import Wait from './components/Step1/Wait.jsx'

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Navigate to={PrivateRoutes.PRIVATE}/>}/>  
          <Route path = "/home" element = {<> <Navbar/> <Home/> <Footer/> </>}/>
          <Route path = {PublicRoutes.LOGIN} element = {<><Login/></>}/>
          <Route element = {<AuthGuard privateValidation={true}/>}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
          {/* <Navbar/> */}
          <Route path = "/paso0" element = {<Step0/>}/>
          <Route path = "/paso2" element = {<><Navbar/> <TableStep2/> <Footer/></>}/>
          <Route path = "/paso5" element = {<><Navbar/> <TableStep5/> <Footer/></>}/>
          <Route path = "/rulechooser" element = {<RuleChooser/>}/>
          <Route path = "/ruleadder" element = {<RuleAdder/>}/>
          <Route path = "/private" element={<><Navbar/> <p>Será redirigido, si esto no ocurre por favor inicie sesión nuevamente</p></>} />
          <Route path="wait/step1" element={<><Navbar/> <Wait step = '1' /> </>} />
          {/* <Login /> */}
          {/* <Footer/> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
