
import { useEffect, useState } from 'react';
import './Style/Header.scss'
import UserMenu from '../UserMenu/UserMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMenuOutline } from "react-icons/io5";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function getUserData() {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/getUserData`;

      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true
        })
        const user = response.data.user[0];
        setImage(user.user_photo);
      } catch (e) {
        console.error("Error al obtener datos ");
      }
    }
    getUserData();
  }, []);

  return (
    <header className="header-container">
      <div onClick={handleClick} className="user-photo">
        <img src={!image ? "src/images/user_anonimo.jpg" : image} alt="foto de usuario" />
      </div>

      {isOpen && (
        <UserMenu />
      )}

      <nav className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/adoptar-patita">Adoptar Patita</Link>
        <Link to="/publicar-patita">Publicar patita</Link>
        <div className="logo-header">
          <Link to="/home-page" className="logo-href">
            <img src="src/images/logoCircular.png" alt="logo-patita" />
          </Link>
        </div>
        <Link to="/patitas-perdidas">Patitas Perdidas</Link>
        <a href="">A ver</a>
      </nav>

      <div className="mobile-menu" onClick={handleMobileMenuClick}>
        <IoMenuOutline className='icon-menu' />
      </div>
    </header>
  );
};

export default Header;