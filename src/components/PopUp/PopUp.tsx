import { useState } from "react";
import { PopUpProps } from "../../types/PopUp";
import './styles/PopUpView.scss';







const PopUp = ({  message }: PopUpProps) => {
    const [showPopUp, setShowPopUp] = useState(false);
  
    const  togglePopUp =()  => {
      setShowPopUp(!showPopUp);
    }
   
   
    
    return (
      <div className="popUp-container">
        {!showPopUp && (
          <button className="btnPopUp-open" onClick={togglePopUp}>Mostrar PopUp</button>
        )}

        {showPopUp && (
          <div className="overlay">
            <div className="popUp-content" >
              <p > {message} </p>
              <button className="popUp-button" onClick={togglePopUp}>Aceptar</button>
            </div>
          </div>
        )}
      </div>
    );
}

export default PopUp