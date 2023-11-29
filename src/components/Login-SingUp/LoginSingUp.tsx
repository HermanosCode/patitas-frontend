import  {MdEmail}  from "react-icons/md";
import {AiFillLock} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import './styles/LoginSingUp.scss';
import { useState } from "react";


 const LoginSingUp = () => {

     const [isRegistering,setIsRegistering] = useState(false);
     const [showPassword,setShowPassword] = useState(false);

     const handleToggleMode = () => {
        setIsRegistering(!isRegistering);
    };

     const togglePassword =() => {
      setShowPassword(!showPassword);
     };

    const classInput = isRegistering ? "register" : "login"


    return (
       
          <div className="login-container">
            <div className="logo">
              <img  src="src/images/huella.png" alt="huella animal" />
            </div>
            <form className= "content-container" action="">
              <h1>{isRegistering ? 'Registro' : 'LogIn'}</h1>
              {isRegistering && (
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
                {!isRegistering && (
                  <span className="span"> Olvidaste tu contraseña?</span>
                )}
              </div>
              <button type="submit" className={`btn ${classInput}`}>
                {isRegistering ? 'Registrar' : 'Logear'}
              </button>
              <div className="container-cuenta">
                <p>
                  {isRegistering ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
                  <span className="span" onClick={handleToggleMode}>
                    {isRegistering ? 'Logearse' : 'Registrarse'}
                  </span>
                </p>
              </div>
            </form>
          </div>
        );
}      

 export default LoginSingUp