import React from 'react'
import { useParams } from 'react-router-dom'
import background from '../../assets/background.svg';

import "./Step1.css"
const Wait = ({step}) => {

// const {step} = useParams();
    

return(
    <div style={{backgroundColor: 'white',
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',}}>
        <div className = "Box" >
            <h1>¡Espera!</h1>
                {step === '1' ? 
            (<div>
                <h2>Estamos verificando que cumples con los requisitos para iniciar la pasantia</h2>
                <p>Debes esperar que un administrador apruebe tu ingreso al sistema</p>
                <p>Cualquier duda contactar con nicolas.cenzano@uai.cl</p>                
            </div>)
                : 
           ( <div>
                <h2>Debes esperar a tu supervisor</h2>
                <p>Debe aceptar tu pasantía, creandose una cuenta con el link enviado a su correo</p>
                <p>Cualquier duda contactar con nicolas.cenzano@uai.cl</p>                
            </div>)
                }

        </div>
    </div>

  );

}

export default Wait