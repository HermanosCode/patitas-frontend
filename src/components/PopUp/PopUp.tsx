
import { PopUpProps } from "../../types/PopUp";
import './Style/PopUp.scss';
import { Link } from "react-router-dom"


const PopUp = ({ message, onClose, onResponse }: PopUpProps) => {

  const handleReload = () => {
    window.location.reload()
  }


 return (
  <div className="overlay">
    <div className="popUp-content">
      <p className="popUp-text">{message}</p>
      {message === 'El usuario ha sido creado' ? (
        <Link to="/home-page">
          <button className="popUp-button single">Aceptar</button>
        </Link>
      ) : message === "Todos los campos son obligatorios.Por favor, completar la información." ? (
        <button onClick={onClose} className="popUp-button single">Aceptar</button>
      ) : message === "Desea publicar la mascota?" ? (
        <div className="popUp-btn-container">
          <Link to="/publicar-patita">
            <button onClick={() => onResponse && onResponse(true)} className="popUp-button double">Si</button>
          </Link>
          <button className="popUp-button double" onClick={onClose}>No</button>
        </div>
      ) : message === "Desea publicar la mascota perdida?" ? (
        <div className="popUp-btn-container">
          <Link to="/patitas-perdidas">
            <button onClick={() => onResponse && onResponse(true)} className="popUp-button double">Si</button>
          </Link>
          <button className="popUp-button double" onClick={onClose}>No</button>
        </div>
      ) : ["Desea guardar los cambios?", "Estas seguro de eliminar la mascota?", "Deseas marcar a la mascota como adoptada?"].includes(message) ? (
        <div className="popUp-btn-container">
          <button onClick={() => onResponse && onResponse(true)} className="popUp-button double">Si</button>
          <button className="popUp-button double" onClick={onClose}>No</button>
        </div>
      ) : (
        <button className="popUp-button single" onClick={handleReload}>Aceptar</button>
      )}
    </div>
  </div>
);
}

export default PopUp;