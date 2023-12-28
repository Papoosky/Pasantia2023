import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import "./Footer.css"


const Footer = () => {


return(
    <div>
        <div className="container" position="static" sx={{ backgroundColor: '#221f1f'}}>
            <div className="texto">
                <p><strong>SANTIAGO –&nbsp;<a href="tel:+56223311000">(56 2) 2331 1000</a><br/>
                </strong>Diagonal las Torres 2640, Peñalolén.<br/>
                Av. Presidente Errázuriz 3485, Las Condes.<br/>
                Av. Santa María 5870, Vitacura.<br/>
                <strong>VIÑA DEL MAR – <a href="tel:+56322503500">(56 32) 250 3500</a><br/>
                </strong>Padre Hurtado 750, Viña del Mar.</p>
                <p><a href="https://www.uai.cl/certificados-academicos/">Certificados académicos</a></p>
                <p><a href="https://www.uai.cl/etica-y-cumplimiento/terminos-y-condiciones/">Términos y Condiciones</a></p>
            </div>

            <div className="logo">
                <img src="https://www.uai.cl/assets/uploads/2022/03/acreditacion_2022_6_anos.png"/>
            </div>
        </div>
    </div>
    );
}

export default Footer

