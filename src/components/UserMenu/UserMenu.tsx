import { FaPaw } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


import './Style/UserMenu.scss';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



const UserMenu = () => {
    const [userName,setUserName] = useState("")
    const [image,setImage] = useState("")

  
  
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

  useEffect(() => {
    async function getUserData () {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/getUserData`;

            try {
                const response = await axios.get(apiUrl, {
                    withCredentials: true
                })
                const user = response.data.user[0]
                setUserName(user.user_name)
                setImage(user.user_photo)
            } catch (e) {
                console.error("Error al obtener datos ")
            }
        }
        getUserData()
    }, [])


    return (
        <div   className='user-content' >
          <div className="arrow"></div>
            <div className="user-data">
              <img src={!image ? "src/images/user_anonimo.jpg" : image} alt="foto de usuario" />
              <h2> {userName}</h2>
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


