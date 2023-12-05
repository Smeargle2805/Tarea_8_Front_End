import React from 'react'
import '../LogIn/login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const url = 'http://localhost:3000/api/users';

export const SignIn = () => {


    const [formData, setFormData] = useState({

        user_name: "",
        email: "",
        pass: ""

    });

    const onHandleChange = (event) => {

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Enviar los datos con Fetch

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

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

                <form className='mt-5 p-4 border rounded shadow-sm bg-light text-center' onSubmit={handleSubmit}>
                    <h2 className="mb-3">Registrarse</h2>
                    <div className="form-floating mb-3">
                        <input type='email' className="form-control" name="email" onChange={onHandleChange} />
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

                    <button className='btn btn-primary w-100' >Registrar</button>

                    <div className='mt-3'>
                        <p className='mb-2'>¿No tienes una cuenta?</p>
                        <button className='btn btn-outline-primary' onClick={goToIniciarSesion}>Inicia Sesion</button>
                    </div>

                </form>

            </div>


        </>
    )
}
