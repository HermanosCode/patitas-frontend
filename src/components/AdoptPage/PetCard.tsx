import { FaRegHeart } from "react-icons/fa6";
import { TbCat } from "react-icons/tb";
import { IoMdFemale } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaHeartCrack } from "react-icons/fa6";
import { useState } from "react";
import "./Styles/PerCardStyles.scss"
import MenuPet from "./MenuPet";

import { Pet } from "../../types/Pet";

const  PetCard = (pet : Pet) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isHeartClick, setIsHeartClick] = useState(false);
    const [isHeartEmpty, setIsHeartEmpty] = useState(false);
    const [isHeartComplete, setIsHeartComplete] = useState(false);

    const handleHeartClick = () => {
        setIsHeartClick(!isHeartClick);
    };



    const handleShowPreview = () => {
        setIsHeartEmpty(true);
    };

    const handleHidePreview = () => {
        setIsHeartEmpty(false);
    };

    const handleShowBrokenHeart = () => {
        setIsHeartComplete(true);
    };

    const handleHideBrokenHeart = () => {
        setIsHeartComplete(false);
    };

    const handleClickButton = () => {
        setIsOpen(!isOpen)
    };

    
    return (

        <div className='pet-card'>
            <img className="img-card" src={pet.pet_photo} alt="imagen mascota" />
            <div className="card-content">
                <h1>{pet.pet_name}</h1>
                <div className="icons">
                    <div className='icons-left'>
                        <IoMdFemale className="icon" />
                        <TbCat className="icon" />
                    </div>
                    <div className='icons-right'>
                        {!isHeartClick ? (
                            isHeartEmpty ? (
                                <FaHeart onMouseLeave={handleHidePreview} onClick={handleHeartClick} className="icon-hearth" />
                            ) : (
                                <FaRegHeart onMouseEnter={handleShowPreview} onClick={handleHeartClick} className="icon-hearth" />
                            )
                        ) : isHeartComplete ? (
                            <FaHeartCrack onMouseLeave={handleHideBrokenHeart} onClick={handleHeartClick} className="icon-hearth" />
                        ) : (
                            <FaHeart onMouseEnter={handleShowBrokenHeart} onClick={handleHeartClick} className="icon-hearth" />
                        )}
                    </div>
                </div>
                {isOpen && (
                    <MenuPet onClose={handleClickButton}  pet={pet}/>
                )}
                <div className="button-container">
                    <button onClick={handleClickButton} className='button-card'>Ver más</button>
                </div>
            </div>
        </div>

    )
}

export default PetCard