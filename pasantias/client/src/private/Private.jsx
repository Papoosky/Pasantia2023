import React from 'react'
import { Route } from 'react-router-dom'
import { Roles } from '../models/roles.ts'
import RoleGuard from '../guards/role.guard.tsx'
// import { PrivateRoutes } from '../models/routes.ts'
import Step0 from '../components/Step0/Step0.jsx'
import RoutesWithNotFound from '../utils/RoutesWithNotFound.tsx'
import StepGuard from '../guards/step.guard.tsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import TableStep2 from '../components/TableStep2/TableStep2.jsx'
// import { Dashboard } from '../components/Dashboard/Dashboard.jsx'
// import RuleChooser from '../components/Admin/RuleChooser.jsx'
import TableStep5 from '../components/TableStep5/TableStep5.jsx'
// import RuleAdder from '../components/Admin/RuleAdder.jsx'
import Wait from '../components/Step1/Wait.jsx'
// import { AceptStep2 } from '../components/Dashboard/AceptStep2.jsx'
import { Supervisor } from '../components/Supervisor/Supervisor.jsx'
import { Profesor } from '../components/Profesor/Profesor.jsx'
import  Home  from '../components/Home/Home'
import Footer from '../components/Footer/Footer'
import Admin from '../components/Admin/Admin'

function Private() {
  return (
    //rutas privadas de la aplicacion
    <RoutesWithNotFound>
      {/* <Route path="/" element={<Navigate to={PrivateRoutes.REDIRECT}/>} /> */}
      <Route element={<RoleGuard role={Roles.ADMIN} />}> 
        <Route path="/dashboard" element={<><Navbar/> <Admin/> <Footer/></>} />
      </Route> 

      <Route element={<RoleGuard role={Roles.STUDENT} />}> 

        <Route>
          <Route path="/private" element={<><Navbar/><Footer/></>} />
        </Route>



        <Route element={<RoleGuard role={Roles.STUDENT} />}> 
          <Route path="/home" element={<><Navbar/><Home/><Footer/></>} />
        </Route>

        <Route element = {<StepGuard step = '0'/>}>
          <Route path="/Step0" element={<><Navbar/><Step0/><Footer/></>} />
        </Route>
        <Route element = {<StepGuard step = '1'/>}>
          <Route path="/step1" element={<><Navbar/> <Wait step = '1' /> <Footer/></>} />
        </Route>
        <Route element = {<StepGuard step = '2'/>}>
          <Route path="/step2" element={<><Navbar/><TableStep2/><Footer/></>} />
        </Route>
        <Route element = {<StepGuard step = '3'/>}>
          <Route path="/step3" element={<><Navbar/> <Wait step = '3' /> <Footer/></>} />
        </Route>
        <Route element = {<StepGuard step = '4'/>}>
          <Route path="/step4" element={<><Navbar/> <Wait step = '1' /> <Footer/></>} />
        </Route>
        <Route element = {<StepGuard step = '5'/>}>
          <Route path="/step5" element={<><Navbar/><TableStep5/><Footer/></>} />
        </Route>

      </Route> 
      <Route element={<RoleGuard role={Roles.SUPERVISOR} />}> 
        <Route path="/supervisor" element={<><Navbar/> <Supervisor/><Footer/></>} />
      </Route>
      <Route element={<RoleGuard role={Roles.PROFESSOR} />}> 
        <Route path="/profesor" element={<><Navbar/> <Profesor/><Footer/></>} />
      </Route>


    </RoutesWithNotFound>
  )
}

export default Private