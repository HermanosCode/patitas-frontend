import { FaPaw } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


import './Style/UserMenu.scss';
import { Link } from "react-router-dom";
import axios from "axios";



const UserMenu = () => {

  
  const handleLogout = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}/auth/logout`;
      await axios.delete(apiUrl,{
        withCredentials : true
      }); 

    } catch (error) {
      console.error('Error al eliminar la cookie:', error);
      // Maneja el error de alguna manera, si es necesario
    }
  };

    return (
        <div   className='user-content' >
          <div className="arrow"></div>
            <div className="user-data">
              <img src="src/images/cv.jpg" alt="foto de usuario" />
              <h2> Nombre Usuario</h2>
              <div className="line"></div>
                <div className="user-set">
                  <Link to="/datos-personales" className="user-part">
                    <FaUserEdit className="menu-icon"/>
                    <p >Datos Personales</p>
                  </Link>
                  <Link to="/patitas-publicadas" className="user-part">
                    <FaPaw className="menu-icon"/>
                    <p >Mis patitas publicadas</p>
                  </Link>
                  <Link to="/patitas-favoritas" className="user-part">
                    <FaHeart className="menu-icon"/>
                    <p >Patitas favoritas</p>
                  </Link>
                  <Link  onClick={handleLogout} to="/" className="user-part-bottom " >
                    <CiLogout className="menu-icon"/>
                    <p>Cerrar Sesión</p>
                  </Link>
                </div>
            </div>
          </div>
    )
}

export default UserMenu


