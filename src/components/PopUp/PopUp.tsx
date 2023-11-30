import { useState } from "react";
import { PopUpProps } from "../../types/PopUp";
import './styles/PopUpView.scss';


const PopUp = ({  message }: PopUpProps) => {

    // Estado para controlar la visibilidad del PopUp
    const [showPopUp, setShowPopUp] = useState(false);

    // Función para alternar la visibilidad del PopUp
    const  togglePopUp =()  => {
      setShowPopUp(!showPopUp);
    }
   
    //Despliega una ventana PopUp
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