
import axios from 'axios';
import './Styles/PersonalData.scss'
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import PopUp from '../PopUp/PopUp';

export default function PersonalDataContent() {
    const [image, setImage] = useState<File | null>(null);
    const [urlImage, setUrlImage] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [edit, setEdit] = useState(false)


    //Mostrar popUp, indicar mensaje y menu del select
    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")



    const handleUploadImageClick = () => {
        if (edit) {
            document.getElementById("image-load")?.click()
        }
    }

    const handleImageChance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setUrlImage(URL.createObjectURL(file));

        }
    }

    const handleEdit = () => {
        setEdit(!edit)
    }


    // Función para validar que solo se ingresen letras
    const isValidInput = (inputValue: string): boolean => /^[a-zA-Z\s]*$/.test(inputValue);

    //Handle change numero de contacto
    const handleNumberContactChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value)
    }

    const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value
        if (isValidInput(imputValue)) {
            setUserName(event.target.value)
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    //Handle para actualizar el popUp
    const handlePopUp = (message: string) => {
        setPopUpMessage(message);
        setShowPopUp(true);
    }

    //Handle para cambiar el estado del popUp
    const handlePopupClose = () => {
        setShowPopUp(false);
    };


    //Funcion para validar que el formulario este completo 
    const validateForm = () => {
        return (!contactNumber || !image);
    }


    const handleUpdateUser = async () => {
        if (validateForm()) {
            handlePopUp("Todos los campos son obligatorios.Por favor, completar la información.");
        } else {
            handlePopUp("Desea guardar los cambios?")
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/getUserData`;

            try {
                const response = await axios.get(apiUrl, {
                    withCredentials: true
                })
                const user = response.data.user[0]
                setEmail(user.user_email)
                setUserName(user.user_name)
                setContactNumber(user.contact_number === null ? "" : user.contact_number)
                setUrlImage(user.user_photo)
            } catch (e) {
                console.error("Error al obtener datos ")
            }
        }
        getUserData()
    }, [])


    const handleSubmit = async () => {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/updateUserData`

        if (image !== null) {
            try {
                const formData = new FormData();

                formData.append('user_photo', (new File([image], image.name)));
                formData.append('contact_number', contactNumber);
                formData.append("user_name", userName)
                formData.append("user_email", email)



                const response = await axios.post(apiUrl, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    handlePopUp(response.data.message);

                }

            } catch (error: any) {
                handlePopUp(error.response.data.message);
            }

        }
    }

    return (
        <div className="personalData-container">
            {showPopUp && (
                <PopUp message={popUpMessage} onClose={handlePopupClose} onResponse={handleSubmit} />
            )}
            <div className="personalData-introduction">
                <h1>Datos Personales</h1>
                <p> La sección de datos personales es el espacio donde puedes ingresar información esencial sobre ti mismo para mantener los datos de  tu cuenta. Aquí, puedes proporcionar detalles como tu nombre, correo electrónico y una foto de perfil</p>
            </div>
            <div className='user-formContainer'>
                <form action="" className='user-form'>
                    <div className="user-headerForm">
                        <input
                            accept="image/*"
                            type="file"
                            id="image-load"
                            name='image'
                            hidden
                            onChange={handleImageChance}
                            required
                        />
                        <div className="user-formPhoto" onClick={handleUploadImageClick}>
                            {urlImage ? (
                                <img src={urlImage} alt='imagen mascota' />
                            ) : (
                                <>
                                    {image ? (
                                        <img src={URL.createObjectURL(image)} alt='imagen mascota' />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt className="icon-load" />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-container">
                        <div className="imput-text">
                            <label htmlFor="nombre-usuario"> Nombre</label>
                            <input
                                id="nombre-usuario"
                                type="text"
                                required
                                value={userName}
                                onChange={handleNombreChange}
                                readOnly={!edit}
                            />
                        </div>
                        <div className="imput-text">
                            <label htmlFor="email-usuario"> Email</label>
                            <input
                                id="email-usuario"
                                type="email"
                                required
                                value={email}
                                onChange={handleEmailChange}
                                readOnly={!edit}

                            />
                        </div>
                        <div className="imput-text">
                            <label htmlFor="numero-contacto"> Numero de Contacto</label>
                            <input
                                id="numero-contacto"
                                type="number"
                                onChange={handleNumberContactChange}
                                readOnly={!edit}
                                value={contactNumber}
                                className='imput-number'
                                required />

                        </div>
                    </div>
                </form>
                <div className="button-container">
                    {edit && (
                        <button
                            onClick={handleEdit}
                            className='btn-publish'> Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        onClick={edit ? handleUpdateUser : handleEdit}
                        className='btn-publish'> {edit ? 'Guardar' : 'Editar'}
                    </button>
                </div>
            </div>
        </div >
    )
}
