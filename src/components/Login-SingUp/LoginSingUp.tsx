import  {MdEmail}  from "react-icons/md";
import {AiFillLock} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import './Style/LoginSingUp.scss';
import { ChangeEvent, useState } from "react";
import axios from "axios";
import PopUp from "../PopUp/PopUp";
import { Navigate } from "react-router-dom";



 const LoginSingUp = () => {

     // Estado para verificar si el usuario esta registrado o no 
     const [isRegisterPage,setIsRegisterPage] = useState(false);

     // Estado para gestionar la visibilidad de la contraseña
     const [showPassword,setShowPassword] = useState(false);
    
     //Estados de los campos de entrada
     const [username,setUsername] = useState('')
     const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
  
     //Estados de la visibilidad y mensaje del popUp
     const [showPopUp,setShowPopUp] = useState(false)
     const [popUpMessage,setPopUpMessage] = useState('')
     
     //Estado para ver si el usuario esta logeado
     const [isLogged,setIsLogged] = useState(false)


    //Cambios en los campos de entrada
    const handleUsernameChange = (event : ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value)
  }

    const handleEmailChange = (event : ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
    }

    const handlePasswordChange = (event : ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    }

  
     // Función para alternar entre la página de registro y la de inicio de sesión
     const handleToggleMode = () => {
      setIsRegisterPage(!isRegisterPage);
      setPassword('')
      setEmail('')
      setUsername('')
    };


    // Funcion para actualizar el popUp
    const handlePopUp = ( message : string) => {
      setPopUpMessage(message);
      setShowPopUp(true);
  }
  
    // funcion para cambiar el estado del popUp
    const handlePopupClose = () => {
      setShowPopUp(false);
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePassword =() => {
    setShowPassword(!showPassword);
   };


    //Comprobar datos formulario para registrarse
    const handleRegister = async (event : React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/register`;      

      if (email === '' || password === '' || username === '') {

        handlePopUp("Los campos no pueden estar vacios ")
      } else if (!/^[A-Za-z\s]*$/.test(username)) {

        handlePopUp("El nombre debe poseer solo letras y espacios")
      } else if (!/@/.test(email)){

        handlePopUp("No es un email valido")
      }
      else {
        const formData = new FormData();
        formData.append('user_email', email);
        formData.append('user_name', username);
        formData.append('user_password', password);
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
              handlePopUp(response.data.message)
       
            }
        } catch (error : any) {
          handlePopUp(error.response.data.message)
        }
      }
    }
    

     //Comprobar datos formulario para logearse
    const handleLogIn = async (event : React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (email === '' || password === '') {
        handlePopUp("Los campos no pueden estar vacios ")
      } 
      else{

      const apiUrl = `${import.meta.env.VITE_BASE_URL}/logIn/singIn`;

      const formData = new FormData();
        formData.append('user_email', email);
        formData.append('user_password', password);
        try{
          const response = await axios.post(apiUrl,formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        if (response.status === 200){
          setIsLogged(true)
        }
        
    } catch (error : any){
      handlePopUp(error.response.data.message)
      }
    }
}



     // Determina la clase de estilo según si es la página de registro o de inicio de sesión
    const classInput = isRegisterPage ? "register" : "login"

    //Componente para registrarse o iniciar sesión 
    return (
        
          <div className="login-container">
            {showPopUp && (
                <PopUp  message={popUpMessage} onClose={handlePopupClose} />
            )}
            {isLogged && (
                <Navigate to="/home-page" />
            )}
            <div className="logo-logIn">
              <img  src="src/images/huella.png" alt="huella animal" />
            </div>
            <form className= "content-container-logIn" action="">
              <h1>{isRegisterPage ? 'Registro' : 'LogIn'}</h1>
              {isRegisterPage && (
                <div className= "imput-box">
                  <FaUser className={`icon ${classInput}`} />
                  <input  
                    type="text" 
                    placeholder="Nombre de Usuario" 
                    value={username}
                    onChange={handleUsernameChange}
                    required/>
                </div>
              )}

              <div className="imput-box">
                <MdEmail className={`icon ${classInput}`} />
                <input  
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={handleEmailChange}
                  required />
              </div>

              <div className="imput-box">
                <AiFillLock className={`icon ${classInput}`} />
                <input  
                type={showPassword ? `text` : `password`} 
                placeholder="Contraseña" 
                value={password}
                onChange={handlePasswordChange}
                required />
                <span className={`icon-eye ${classInput}`} onClick={togglePassword}> {showPassword ? <FaRegEyeSlash/> : <IoEyeSharp/>} </span>
              </div>
      
              <div className="forgot-container">
                {!isRegisterPage && (
                  <span className="span"> Olvidaste tu contraseña?</span>
                )}
              </div>
              <button  
                type="submit" 
                className={`btn ${classInput}`}
                onClick={isRegisterPage ? handleRegister : handleLogIn}>

                {isRegisterPage ? 'Registrar' : 'Iniciar Sesion'}
              </button>
              
              <div className="container-cuenta">
                <p>
                  {isRegisterPage ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
                  <span className="span" onClick={handleToggleMode}>
                    {isRegisterPage ? 'Iniciar sesion' : 'Registrarse'}
                  </span>
                </p>
              </div>
            </form>
          </div>
        );
}   
    
 export default LoginSingUp

 
