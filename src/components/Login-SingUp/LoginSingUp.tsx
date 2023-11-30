import  {MdEmail}  from "react-icons/md";
import {AiFillLock} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import './styles/LoginSingUp.scss';
import { useState } from "react";


 const LoginSingUp = () => {

     // Estado para verificar si el usuario esta registrado o no 
     const [isRegisterPage,setIsRegisterPage] = useState(false);

     // Estado para gestionar la visibilidad de la contraseña
     const [showPassword,setShowPassword] = useState(false);
     
     // Función para alternar entre la página de registro y la de inicio de sesión
     const handleToggleMode = () => {
      setIsRegisterPage(!isRegisterPage);
    };

     // Función para alternar la visibilidad de la contraseña
     const togglePassword =() => {
      setShowPassword(!showPassword);
     };

     // Determina la clase de estilo según si es la página de registro o de inicio de sesión
    const classInput = isRegisterPage ? "register" : "login"

    //Componente para registrarse o iniciar sesión 
    return (
       
          <div className="login-container">
            <div className="logo">
              <img  src="src/images/huella.png" alt="huella animal" />
            </div>
            <form className= "content-container" action="">
              <h1>{isRegisterPage ? 'Registro' : 'LogIn'}</h1>
              {isRegisterPage && (
                <div className= "imput-box">
                  <FaUser className={`icon ${classInput}`} />
                  <input type="text" placeholder="Usuario" required/>
                </div>
              )}

              <div className="imput-box">
                <MdEmail className={`icon ${classInput}`} />
                <input type="email" placeholder="Email" required />
              </div>
              <div className="imput-box">
                <AiFillLock className={`icon ${classInput}`} />
                <input type={showPassword ? `text` : `password`} placeholder="Contraseña" required />
                <span className={`icon-eye ${classInput}`} onClick={togglePassword}> {showPassword ? <FaRegEyeSlash/> : <IoEyeSharp/>} </span>
              </div>
      
              <div className="forgot-container">
                {!isRegisterPage && (
                  <span className="span"> Olvidaste tu contraseña?</span>
                )}
              </div>
              <button type="submit" className={`btn ${classInput}`}>
                {isRegisterPage ? 'Registrar' : 'Logear'}
              </button>
              <div className="container-cuenta">
                <p>
                  {isRegisterPage ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
                  <span className="span" onClick={handleToggleMode}>
                    {isRegisterPage ? 'Logearse' : 'Registrarse'}
                  </span>
                </p>
              </div>
            </form>
          </div>
        );
}      
 export default LoginSingUp