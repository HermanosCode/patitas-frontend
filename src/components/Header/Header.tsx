
import { useEffect, useRef, useState } from 'react';
import './Style/Header.scss'
import UserMenu from '../UserMenu/UserMenu';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null)


  const handleClick = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  });


  return (
    <header ref={menuRef} className="header-container">
      <div onClick={handleClick} className="user-photo" >
        <img src="src/images/cv.jpg" alt="foto de usuario" />
      </div>

      {isOpen && (
        <UserMenu />
      )}

      <nav className="nav-container">
        <Link to="/adoptar-patita">Adoptar Patita</Link>
        <Link to="/patitas-perdidas">Patitas Perdidas</Link>
        <div className="logo-header">
          <Link to="/home-page" className="logo-href" >
            <img src="src/images/logoCircular.png" alt="logo-patita" />
          </Link>
        </div>
        <Link to="/publicar-patita">Publicar patita</Link>
        <a href="">A ver</a>
      </nav>
    </header>
  );
};

export default Header;


