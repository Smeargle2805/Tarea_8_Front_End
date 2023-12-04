import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom"
import { LogIn } from "./Componentes/LogIn/LogIn"
import { SignIn } from "./Componentes/SignIn/SignIn"
import { Posts } from "./Componentes/Posts/Posts"
import { Wall } from "./Componentes/Wall/Wall"
import { Error } from "./Componentes/Error/Error"
import './index.css';
import { useState, useEffect } from "react"
import axios from "axios"


function App() {


  const [inicioSesion, setInicioSesion] = useState(false);
  const [inicioSesionInfo , setInicioSesionInfo] = useState({});

  const validarCookie = async ( )=>{

    const ulrValidar = 'http://localhost:3000/api/auth'
    const result = await axios.get(ulrValidar,  { withCredentials:true} );
    const resultData = (await result).data;

    if (result.status ===200){

      setInicioSesion(true);
      setInicioSesionInfo(resultData);

    }
    


  }

  useEffect ( ()=>{

    validarCookie();

  } ,  [] );


  return (
    <>
      <BrowserRouter>
        <Routes>
          {  inicioSesion ? (<Route path="/"  element={<Wall/>}/ >) :  
                            <Route path="/" element ={<LogIn prop1 = {setInicioSesion}  />} /> }
          <Route path="/crearUsuario" element ={<SignIn/>}></Route>
          { inicioSesion ?  (<Route path="/crearPost" element ={<Posts infoUsuario = {inicioSesionInfo} />} />) : <></> }
          { inicioSesion ? (<Route path="/wall" element ={<Wall/>} />) :<></> }
          <Route path="*" element ={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
