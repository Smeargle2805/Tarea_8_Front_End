import React from 'react'
import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LogIn = ( {prop1} ) => {

  const url = `http://localhost:4000/api/auth`

  const navigate = useNavigate();

  const goToCrearUsuario = () => {

    navigate('/crearUsuario');

  }

  const [formData, setFormData] = useState({

    email: "",
    pass: ""

  });


  const onHandleChange = (event) => {

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.post(url, formData,  { withCredentials : true }  );
    const resultData = (await result).data;

    if (result.status === 200){

      prop1(true);
      navigate('/wall')


    }
  
    if (result.status === 404){

      console.log("Inicio de Sesion No Exitoso");
    }
  

  }

  return (
    <>

      <div className='container' >

        <form className='mt-5 formInicioSesion' onSubmit={onHandleSubmit} >
          <div className="form-floating mb-3">
            <input className="form-control" name = "email" onChange={onHandleChange} />
            <label >Correo Electronico</label>
          </div>

          <div className="form-floating mb-3">
            <input type='password' className="form-control" name = "pass"  onChange={onHandleChange} />
            <label >Contraseña</label>
          </div>

          <button className='btn btn-primary w-100' >Iniciar Sesion</button>

        </form>

        <div className='formInicioSesion'>
          ¿No tienes una cuenta?
          <button className='btn' onClick={goToCrearUsuario} >Registrate</button>
        </div>

      </div>

    </>
  )
}
