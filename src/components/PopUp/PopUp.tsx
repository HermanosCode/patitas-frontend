
import { PopUpProps } from "../../types/PopUp";
import './Style/PopUp.scss';
import { Link } from "react-router-dom"


const PopUp = ({  message,onClose }: PopUpProps) => {

    return (
          <div className="overlay">
            <div className="popUp-content" >
              <p > {message} </p>
              {message === 'El usuario ha sido creado' ? (
                <Link to="/home-page"><button className="popUp-button">Aceptar</button> </Link>
                ):(
                  <button className="popUp-button" onClick={onClose}>Aceptar</button>
                )}
            </div>
          </div>
    )
  }

export default PopUp