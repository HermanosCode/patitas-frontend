import { FaPaw } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


import './styles/UserMenu.scss';
import { Link } from "react-router-dom";


const UserMenu = () => {

    return (
        <div   className='user-content' >
          <div className="arrow"></div>
            <div className="user-data">
              <img src="src/images/cv.jpg" alt="foto de usuario" />
              <h2>  Usuario</h2>
              <div className="line"></div>
                <div className="user-set">
                  <Link to="/datos-personales" className="user-part">
                    <FaUserEdit/>
                    <p >Datos Personales</p>
                  </Link>
                  <Link to="/patitas-publicadas" className="user-part">
                    <FaPaw className="icon"/>
                    <p >Mis patitas publicadas</p>
                  </Link>
                  <Link to="/patitas-favoritas" className="user-part">
                    <FaHeart/>
                    <p >Patitas favoritas</p>
                  </Link>
                  <Link  to="/logIn" className="user-part-bottom " >
                    <CiLogout/>
                    <p>Cerrar Sesión</p>
                  </Link>
                </div>
            </div>
          </div>
    )
}

export default UserMenu


