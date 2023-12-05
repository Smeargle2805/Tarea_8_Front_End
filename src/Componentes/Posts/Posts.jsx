import '../Posts/Posts.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Posts = ( {infoUsuario}  ) => {

    const navigate = useNavigate();

    const url  = 'http://localhost:3000/api/posts';

    const [datoFormulario, setDatosFormularios] = useState({

        user_name: infoUsuario.user_name,
        description: ""

    });

    const handleChange = (event) => {

        const { name, value } = event.target;
        setDatosFormularios({ ...datoFormulario, [name]: value });

    }

    const onSubmit = async (event)=>{

        event.preventDefault();

        const dataSend = new FormData();
        dataSend.append( "user_name", datoFormulario.user_name);
        dataSend.append( "description", datoFormulario.description);
        
        const result= await axios.post( url, dataSend, { withCredentials : true } );
        const resultData = (await result).data;
 
        navigate('/wall');

    }


    return (
        <>
            <div className='container' id='post' >


                <form onSubmit={onSubmit} className='mt-5 formInicioSesion'>
                    <h2 className="mb-4">Crear Post</h2>
                    <div className="form-floating mb-3">
                        <input type='text' className="form-control" disabled = {true} name="user_name" value = {infoUsuario.user_name} />
                        <label >Usuario</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type='text' className="form-control" name="description" onChange={handleChange} />
                        <label >Descripcion</label>
                    </div>

                    <button className='btn btn-primary w-100' >Publicar</button>


                </form>

            </div>

        </>
    )
}
