import '../LogIn/login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Posts = ( {infoUsuario}  ) => {

    const navigate = useNavigate();

    const url  = 'http://localhost:3000/api/posts';

    const [imagen, setImagen] = useState();

    const [datoFormulario, setDatosFormularios] = useState({

        user_name: infoUsuario.user_name,
        description: ""

    });

    const handleChange = (event) => {

        const { name, value } = event.target;
        setDatosFormularios({ ...datoFormulario, [name]: value });

    }

    const handleChangeImg = (event) => {

        setImagen(event.target.files[0]);

    }

    const onSubmit = async (event)=>{

        event.preventDefault();

        const dataSend = new FormData();
        dataSend.append( "user_name", datoFormulario.user_name);
        dataSend.append( "description", datoFormulario.description);
        dataSend.append( "imagen", imagen );

        // Fetch por defecto hace request de tipo Form Data
        const response  =  await fetch(url, {
            method : "POST", 
            body  : dataSend
        });

        
        const result= await axios.post( url, dataSend, { withCredentials : true } );
        const resultData = (await result).data;
 
        navigate('/wall');

    }


    return (
        <>
            <div className='container' >


                <form onSubmit={onSubmit} className='mt-5 formInicioSesion'>

                    <div className="form-floating mb-3">
                        <input type='text' className="form-control" disabled = {true} name="user_name" value = {infoUsuario.user_name} />
                        <label >Usuario</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type='text' className="form-control" name="description" onChange={handleChange} />
                        <label >Descripcion</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type='file' className="form-control" name="imagen" onChange={handleChangeImg} />
                        <label >Imagen</label>
                    </div>

                    <button className='btn btn-primary w-100' >Crear</button>


                </form>

            </div>

        </>
    )
}
