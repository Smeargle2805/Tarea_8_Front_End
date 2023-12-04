import React from 'react'
import '../LogIn/login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios  from 'axios'

const url = 'http://localhost:4000/api/users';

export const SignIn = () => {


    const [formData, setFormData] = useState({

        user_name: "",
        email: "",
        pass: ""

    });




    const onHandleChange = (event) => {

        const { name, value } = event.target;
        setFormData({...formData, [name] : value});

        // Enviar los datos con Fetch

    };

    const handleSubmit = async (event)=>{

        event.preventDefault();    
        
        /*
        Enviar datos con fetch
        fetch(url, {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify(formData)
        })
        .then(  (response)=>{

            console.log(response);
            return response.json();
        })
        .then(data => {
            // Hacer algo con los datos de la respuesta (si es necesario)
            console.log('Response data:', data);
          })
        .catch( (err) => {

            console.log(err.message);

        })*/

        const result = await axios.post(url, formData);
        const data = (await result).data;

        console.log(data);

    }


    const navigate = useNavigate();

    const goToIniciarSesion = () => {

        navigate('/')

    }

    return (
        <>

            <div className='container' >

                <form className='mt-5 formInicioSesion'  onSubmit={handleSubmit} >
                    <div className="form-floating mb-3">
                        <input  type='email' className="form-control" name="email" onChange={onHandleChange} />
                        <label >Correo Electronico</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type='text' className="form-control" name="user_name" onChange={onHandleChange} />
                        <label >Nombre de Usuario</label>
                    </div>


                    <div className="form-floating mb-3">
                        <input type='password' className="form-control" name="pass" onChange={onHandleChange} />
                        <label >Contraseña</label>
                    </div>

                    <button className='btn btn-primary w-100' >Registrarse</button>

                </form>


                <div className='formInicioSesion'>
                    ¿Tienes una cuenta?
                    <button className='btn' onClick={goToIniciarSesion} >Inicia Sesion</button>
                </div>

            </div>


        </>
    )
}
