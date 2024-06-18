import { FaRegHeart } from "react-icons/fa6";
import { TbCat } from "react-icons/tb";
import { IoMdFemale } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaHeartCrack } from "react-icons/fa6";
import { useState } from "react";
import "./Styles/PetCard.scss"
import MenuPet from "./MenuPet";
import { PetCardProps } from "../../types/PetCardProps";
import axios from "axios";
import FormPet from "../PublishPage/FormPet";
import PopUp from "../PopUp/PopUp";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { MdPets } from "react-icons/md";


const PetCard = ({ pet, petType, myPetsAdopt, isFavorite }: PetCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isHeartClick, setIsHeartClick] = useState(isFavorite ? true : false);
    const [isHeartEmpty, setIsHeartEmpty] = useState(false);
    const [isHeartComplete, setIsHeartComplete] = useState(false);
    const [isDelete, setIsDelete] = useState(false)



    //Mostrar popUp, indicar mensaje y menu del select
    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")




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

    const handleEdit = () => {
        setIsEdit(!isEdit)

    };



    const handleIsDelete = () => {
        setIsDelete(!isDelete)
    };




    //Handle para actualizar el popUp
    const handlePopUp = (message: string) => {
        setPopUpMessage(message);
        setShowPopUp(true);
    }

    //Handle para cambiar el estado del popUp
    const handlePopupClose = () => {
        setShowPopUp(false);
    };



    const handleDeletePet = () => {
        handleIsDelete()
        handlePopUp("Estas seguro de eliminar la mascota?")
    }

    const handleAdoptPet = () => {
        handlePopUp("Deseas marcar a la mascota como adoptada?")
    }

    const handleDelete = async () => {
        try {
            const apiUrl = petType !== "lost" ? `${import.meta.env.VITE_BASE_URL}/pet/delete` : `${import.meta.env.VITE_BASE_URL}/lostPets/deleteLostPet`
            const response = await axios.delete(apiUrl, {
                data: {
                    pet_id: pet.pet_id,
                    pet_photo: pet.pet_photo
                }
            });
            handlePopUp(response.data.message);


        }
        catch (e) {
            console.error(e)
        }
    }

    const handleAdopt = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/pet/adoptPet`
            const response = await axios.put(
                apiUrl,
                {
                    pet_id: pet.pet_id
                },
                {
                    withCredentials: true
                }
            );
            handlePopUp(response.data.message);

        } catch (e) {
            console.error(e)
        }
    }


    const handleHeartMark = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/addFavorite`

            const response = await axios.put(
                apiUrl,
                {
                    pet_id: pet.pet_id
                },
                {
                    withCredentials: true
                }
            );
            setIsHeartClick(!isHeartClick);
        }
        catch (e) {
        }
    }

    const handleHeartNotMark = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/deleteFavorite`

            const response = await axios.put(
                apiUrl,
                {
                    pet_id: pet.pet_id
                },
                {
                    withCredentials: true
                }
            );
            setIsHeartClick(!isHeartClick);
        }
        catch (e) {

        }
    }

    return (

        <div className='pet-card'>
            {showPopUp && (
                <PopUp
                    message={popUpMessage}
                    onClose={handlePopupClose}
                    onResponse={isDelete ? handleDelete : handleAdopt}
                />
            )}


            {myPetsAdopt ? (
                <>
                    <img className="img-card" src={pet.pet_photo} alt="imagen mascota" />
                    <div className="card-content">
                        <h1>{pet.pet_name}</h1>
                        <div className="button-container adopt">
                            <button onClick={handleClickButton} className='button-card'>Ver más</button>
                        </div>
                    </div>
                    {isOpen && (
                        <MenuPet onClose={handleClickButton} petType={petType} pet={pet} />
                    )}
                </>
            ) : (
                petType === "myPets" || petType === "lost" ? (
                    <>
                        <img className="img-card" src={pet.pet_photo} alt="imagen mascota" />
                        <div className="card-content">
                            <h1>{pet.pet_name}</h1>
                            <div className="cardPets-buttons">
                                <BsInfoCircleFill onClick={handleClickButton} className="button-pet info" />
                                <RiEdit2Fill onClick={handleEdit} className="button-pet edit" />
                                <MdDelete onClick={handleDeletePet} className="button-pet delete" />
                                {petType !== "lost" && (
                                    <MdPets onClick={handleAdoptPet} className="button-pet adopt" />
                                )}
                            </div>
                            {isOpen && (
                                <MenuPet onClose={handleClickButton} petType={petType} pet={pet} />
                            )}
                            {isEdit && (
                                <div className="overlay-pet">
                                    <FormPet edit={true} onClose={handleEdit} petType={petType} pet={pet} />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <img className="img-card" src={pet.pet_photo} alt="imagen mascota" />
                        <div className="card-content">
                            <h1>{pet.pet_name}</h1>
                            <div className="icons">
                                <div className='icons-left'>
                                    <IoMdFemale className="icon" />
                                    <TbCat className="icon" />
                                </div>
                                <div className='icons-right'>
                                    {
                                        !isHeartClick ? (
                                            isHeartEmpty ? (
                                                <FaHeart onMouseLeave={handleHidePreview} onClick={handleHeartMark} className="icon-hearth" />
                                            ) : (
                                                <FaRegHeart onMouseEnter={handleShowPreview} className="icon-hearth" />
                                            )
                                        ) : (
                                            isHeartComplete ? (
                                                <FaHeartCrack onMouseLeave={handleHideBrokenHeart} onClick={handleHeartNotMark} className="icon-hearth" />
                                            ) : (
                                                <FaHeart onMouseEnter={handleShowBrokenHeart} className="icon-hearth" />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            {isOpen && (
                                <MenuPet onClose={handleClickButton} petType={petType} pet={pet} />
                            )}
                            <div className="button-container">
                                <button onClick={handleClickButton} className='button-card'>Ver más</button>
                            </div>
                        </div>
                    </>
                )
            )}

        </div>
    )
}
export default PetCard