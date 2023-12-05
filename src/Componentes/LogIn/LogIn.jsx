import React from 'react'
import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LogIn = ({ prop1 }) => {

  const url = `http://localhost:3000/api/auth`

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

    const result = await axios.post(url, formData, { withCredentials: true });
    const resultData = (await result).data;

    if (result.status === 200) {

      prop1(true);
      navigate('/wall')


    }

    if (result.status === 404) {

      console.log("Inicio de Sesion No Exitoso");
    }


  }

  return (
    <>

      <div className='container'>

        <form className='mt-5 p-4 border rounded shadow-sm bg-light text-center' onSubmit={onHandleSubmit}>
          <img src="/twitter.png" alt="Twitter Logo" className="twitter-logo mx-auto d-block" id="twitter-negro" />
          <h2 className="mb-4">Iniciar Sesión</h2>

          <div className="form-floating mb-3">
            <label htmlFor="email" className="form-label mt-3">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onHandleChange} />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="pass" className="form-label mt-3">Contraseña</label>
            <input type="password" className="form-control" id="pass" name="pass" onChange={onHandleChange} />
          </div>

          <button type="submit" className='btn btn-primary w-100'>Iniciar Sesión</button>

          <div className='mt-3'>
            <p className='mb-2'>¿No tienes una cuenta?</p>
            <button className='btn btn-outline-primary' onClick={goToCrearUsuario}>Regístrate</button>
          </div>

        </form>

      </div>

    </>
  )
}
