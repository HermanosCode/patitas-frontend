import { ChangeEvent, useEffect, useState } from 'react';
import './Style/FormPet.scss'
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from 'react-select';
import edadMascota from '../../utils/edadMascota.json';
import axios, { AxiosResponse } from 'axios';
import PopUp from '../PopUp/PopUp';
import { FormPetsProps } from '../../types/FormPetProps';




export default function FormPet({ onClose,petType,edit, pet }: FormPetsProps) {

    const [image, setImage] = useState<File | null>(null);
    const urlImage = (pet ? pet.pet_photo : "");
    const [petName, setPetName] = useState(pet ? pet.pet_name : "");
    const [petRace, setPetRace] = useState(pet ? pet.pet_race : "");
    const [petAge, setPetAge] = useState(pet ? pet.pet_age : "");
    const [contactNumber, setContactNumber] = useState(pet ? pet.contact_number : "");
    const [genderPet, setGenderPet] = useState(pet ? pet.pet_gender : "");
    const [typePet, setTypePet] = useState(pet ? pet.pet_type : "");
    const [disabilityPet, setDisabilityPet] = useState<boolean | null>(pet ? pet.pet_disability : null);
    const [veterinaryCare, setVeterinaryCare] = useState<boolean | null>(pet ? pet.veterinary_care : null);
    const [petInfo, setPetInfo] = useState(pet ? pet.pet_description : "");
    const [province, setProvince] = useState(pet ? pet.pet_province : "");
    const [optionsProvincias, setOptionsProvincia] = useState([]);
    const [location, setLocation] = useState(pet ? pet.pet_location : "");
    const [optionsLocalidad, setOptionsLocalidad] = useState([]);

    
    //Mostrar popUp, indicar mensaje y menu del select
    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")


    // Función para validar que solo se ingresen letras
    const isValidInput = (inputValue: string): boolean => /^[a-zA-Z\s]*$/.test(inputValue);

    //Handle change nombre 
    const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value
        if (isValidInput(imputValue)) {
            setPetName(event.target.value)
        }
    }

    //Handle change raza
    const handleRaceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value
        if (isValidInput(imputValue)) {
            setPetRace(event.target.value)
        }
    }



    //Handle change numero de contacto
    const handleNumberContactChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value)
    }

    //Handle informacion mascota change
    const handlePetInfoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPetInfo(event.target.value)
    }

    //Handle edad mascota change
    const handlePetAge = (option: any) => {
        setPetAge(option.value);
    }



    //handle de valor provincia
    const handlePronvincia = (option: any) => {
        setProvince(option.value);
        setLocation("")
        obtenerLocalidad(option.value)
    }

    const handleLocalidad = (option: any) => {
        setLocation(option.value)
    }

    //Handle genero mascota change
    const handleGenderPetChange = (tipo: string) => {
        setGenderPet(tipo)
    }


    //Handle tipo mascota change
    const handleTypePetChange = (tipo: string) => {
        setTypePet(tipo)
    }


    //Handle dispacadidad mascota change 
    const handleDisabilityPetChange = (option: boolean) => {
        setDisabilityPet(option)
    }

    //Handle atencion veterinaria change 
    const handleVeterinaryCare = (option: boolean) => {
        setVeterinaryCare(option)
    }


    //Handle para cargar imagen
    const handleUploadImageClick = () => {
        document.getElementById("image-load")?.click()

    }

    //handle para imagen change 
    const handleImageChance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }


    useEffect(() => {
        const obtenerProvincias = () => {
            axios.get("https://apis.datos.gob.ar/georef/api/provincias")
                .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                        return res.data.provincias;
                    } else {
                        return Promise.reject(res);
                    }
                })
                .then(provincias => {
                    const opcionesProvincias = provincias.map((provincia: any) => ({
                        value: provincia.nombre,
                        label: provincia.nombre
                    }));
                    setOptionsProvincia(opcionesProvincias)
                })
                .catch(error => {
                    console.log(error)
                });
        };

        obtenerProvincias();
    }, []);


    const obtenerLocalidad = (provincia: string) => {

        const cantidadLocalidades = 900;

        axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=${cantidadLocalidades}`)
            .then((res) => {
                if (res.status === 200) {

                    const opcionesMunicipio = res.data.municipios.map((municipio: any) => ({
                        value: municipio.nombre,
                        label: municipio.nombre
                    }));
                    setOptionsLocalidad(opcionesMunicipio);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch(error => {
                console.error('Error al obtener localidades:', error);
            });

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
        return (!petName || !petRace || !petAge || !contactNumber || !genderPet || !typePet || !petInfo || !image || disabilityPet === null || veterinaryCare === null
            || !province || !location);
    }


    const validateUpdate = () => {
        return (petName || petRace || petAge || contactNumber || genderPet || typePet || petInfo || disabilityPet === null || veterinaryCare === null
            || province || location);
    }



    //Logica publicacion mascota
    const handleSubmit = async () => {

        const apiUrl = petType !== "lost" ? `${import.meta.env.VITE_BASE_URL}/pet/publish` : `${import.meta.env.VITE_BASE_URL}/lostPets/publish`;

        if (image !== null) {
            try {
                const formData = new FormData();

                formData.append('pet_photo', (new File([image], image.name)));
                formData.append('pet_name', petName);
                formData.append('pet_race', petRace);
                formData.append('pet_age', petAge);
                formData.append('contact_number', contactNumber);
                formData.append('pet_gender', genderPet === "Macho" ? 'Macho' : 'Hembra');
                formData.append('pet_type', typePet === "Gato" ? 'Gato' : 'Perro');
                formData.append('pet_disability', disabilityPet ? '1' : '0');
                formData.append('veterinary_care', veterinaryCare ? '1' : '0');
                formData.append('pet_description', petInfo);
                formData.append('pet_province', province);
                formData.append('pet_location', location);


                const response = await axios.post(apiUrl, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    handlePopUp(response.data.message);
                    handleReset()

                }

            } catch (error: any) {
                handlePopUp(error.response.data.message);
            }

        }
    };


    //Handle submit pet
    const handleSubmitPet = async () => {
        if (validateForm()) {
            handlePopUp("Todos los campos son obligatorios.Por favor, completar la información.");
        } else {
            handlePopUp("Desea publicar la mascota?")
        }
    }



    //handle para actualizar mascota
    const handleUpdate = async () => {

        const apiUrl = petType !== "lost" ? `${import.meta.env.VITE_BASE_URL}/pet/updatePet` : `${import.meta.env.VITE_BASE_URL}/lostPets/updateLostPet`;

        try {
            const formData = new FormData();
            if (image) {
                formData.append('pet_photo', (new File([image], image.name)));
            }
            if(petType === "lost"){
                formData.append('pet_id', pet?.pet_id || '')
                formData.append('url_image', urlImage)
                formData.append('pet_name', petName);
                formData.append('contact_number', contactNumber);
                formData.append('pet_description', petInfo);
                formData.append('pet_province', province);
                formData.append('pet_location', location);
            } else{
                formData.append('pet_id', pet?.pet_id || '')
                formData.append('url_image', urlImage)
                formData.append('pet_name', petName);
                formData.append('pet_race', petRace);
                formData.append('pet_age', petAge);
                formData.append('contact_number', contactNumber);
                formData.append('pet_gender', genderPet);
                formData.append('pet_type', typePet);
                formData.append('pet_disability', disabilityPet ? '1' : '0');
                formData.append('veterinary_care', veterinaryCare ? '1' : '0');
                formData.append('pet_description', petInfo);
                formData.append('pet_province', province);
                formData.append('pet_location', location);
            }
            


            const response = await axios.put(apiUrl, formData, {
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
    };

    const handleUpdatePet = () => {
        if (!validateUpdate()) {
            handlePopUp("Todos los campos son obligatorios.Por favor, completar la información.");
        } else {
            handlePopUp("Desea guardar los cambios?")
        }
    }

    //Handle reseteo publicacion
    const handleReset = () => {
        setPetName(""),
            setPetRace(""),
            setContactNumber(""),
            setPetAge(""),
            setLocation(""),
            setProvince("")
        setGenderPet(""),
            setTypePet(""),
            setDisabilityPet(null),
            setVeterinaryCare(null),
            setPetInfo(""),
            setImage(null)


        // Obtener todos los inputs de tipo radio dentro del contenedor con la clase "checkbox-container"
        const radioButtonsReset = document.querySelectorAll('.checkbox-container input[type="radio"]');

        radioButtonsReset.forEach(button => {
            (button as HTMLInputElement).checked = false;
        });
    }



    // Estilos para el componente Select 
    const customStyles = {
        control: (styles: any) => ({
            ...styles,
            borderRadius: "5px",
            border: "1px solid #E05D5D",
            backgroundColor: "#FFF8E5",
            marginTop: "11px",
            fontSize: "17px",
            outline: "none",
            width: "260px",
            height: "41px",
            fontFamily: 'Barlow, sans-serif',
            letterSpacing: "0.5px",
            padding: "0px 5px",
            boxShadow: "none",
            cursor: "pointer",
            color: "#225b77",
            fontWeight: "200",

            '&:hover': {
                borderColor: "#E05D5D",
            },
        }),
        input: (style: any) => ({
            ...style,
            color: "#225b77"
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: "#225b77",
            width: "100%",
        }),
        option: (styles: any, { isSelected }: { isSelected: boolean }) => ({
            ...styles,
            backgroundColor: isSelected ? '#FFF8E5' : null,
            fontSize: "18px",
            fontFamily: 'Barlow, sans-serif',
            color: isSelected ? "#225b77" : null,
            padding: "7px 0px",
            paddingLeft: "20px",
            cursor: "pointer",

            '&:hover': {
                backgroundColor: "#fdd79d"
            },
        }),
        menuList: (style: any) => ({
            ...style,
            padding: '0'
        }),
        menu: (styles: any) => ({
            ...styles,
            backgroundColor: "#FFF8E5",
            border: "1px solid #E05D5D",
            borderRadius: 0,
            className: 'react-select-menu',
        }),
        indicatorSeparator: (style: any) => ({
            ...style,
            backgroundColor: '#E05D5D',
        }),
        dropdownIndicator: (style: any, { isFocused }: { isFocused: boolean }) => ({
            ...style,
            color: isFocused ? '#E05D5D' : '#E05D5D',
            transition: 'color 0.2s',

            '&:hover': {
                color: isFocused ? '#E05D5D' : '#E05D5D',
            },
        }),
    };


    return (

        <div className={`${edit ? "form-container-edit" : "form-container"}`}>
            {showPopUp && (
                edit ? (
                    <PopUp message={popUpMessage} onClose={handlePopupClose} onResponse={handleUpdate} />
                ) : (
                    <PopUp message={popUpMessage} onClose={handlePopupClose} onResponse={handleSubmit} />
                )
            )}
            {petType !== "lost" ? (
            <form className='form-publishPage'>
                <input
                    accept="image/*"
                    type="file"
                    id="image-load"
                    name='image'
                    hidden
                    onChange={handleImageChance}
                    required
                />
                <div className="header-form">
                    <div className="pet-photo" onClick={handleUploadImageClick}>
                        {edit && !image ? (

                            <img src={urlImage} alt='imagen mascota' />
                        ) : (

                            <>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt='imagen mascota' />
                                ) : (
                                    <>
                                        <FaCloudUploadAlt className="icon-load" />
                                        <p>Subir imagen</p>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="text-container">
                    <div className="imput-text">
                        <label htmlFor="nombre-mascota"> Nombre Mascota</label>
                        <input
                            value={petName}
                            onChange={handleNombreChange}
                            id="nombre-mascota"
                            type="text"
                            required
                        />
                    </div>

                    <div className="imput-text">
                        <label htmlFor="edad-mascota"> Edad Mascota</label>
                        <Select
                            id="edad-mascota"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={edadMascota}
                            value={ {value : petAge, label: petAge} }
                            required
                            onChange={handlePetAge}
                            placeholder="Seleccionar edad ..."
                            isSearchable
                        />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="raza-mascota"> Raza Mascota</label>
                        <input
                            value={petRace}
                            onChange={handleRaceChange}
                            id="raza-mascota"
                            type="text"
                            required
                        />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="provincia">Provicia</label>
                        <Select
                            id="provincia"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsProvincias}
                            value={ {value : province, label: province} }
                            required
                            onChange={handlePronvincia}
                            placeholder="Seleccionar provincia ..."
                            isSearchable
                        />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="numero-contacto"> Numero de Contacto</label>
                        <input
                            value={contactNumber}
                            onChange={handleNumberContactChange}
                            id="numero-contacto"
                            type="number"
                            className='imput-number'
                            required />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="localidad">Localidad</label>
                        <Select
                            id='localidad'
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsLocalidad}
                            value={ {value : location, label: location} }
                            required
                            onChange={handleLocalidad}
                            placeholder="Seleccionar localidad ..."
                            isSearchable
                        />
                    </div>
                </div>
                <div className="footer-form">
                    <h3>Descripción de la mascota</h3>
                    <textarea
                        value={petInfo}
                        onChange={handlePetInfoChange}
                        className='text'
                        required >
                    </textarea>
                </div>
                <div className="checkbox-container">
                    <div className="imput-checkbox">
                        <h4><span>Genero Mascota</span></h4>
                        <label htmlFor="genero-mascota-hembra">
                            <input
                                onClick={() => handleGenderPetChange('Hembra')}
                                id="genero-mascota-hembra"
                                type="radio"
                                name="group1"
                                defaultChecked={genderPet === "Hembra"}
                                required
                            /> Hembra
                        </label>
                        <label htmlFor="genero-mascota-macho">
                            <input
                                onChange={() => handleGenderPetChange('Macho')}
                                id="genero-mascota-macho"
                                type="radio"
                                name="group1"
                                defaultChecked={genderPet === "Macho"}
                                required
                            /> Macho
                        </label>
                    </div>
                    <div className="imput-checkbox">
                        <h4><span>Tipo Mascota</span></h4>
                        <label htmlFor="tipo-mascota-gato">
                            <input
                                onChange={() => handleTypePetChange('Gato')}
                                id="tipo-mascota-gato"
                                type="radio"
                                name="group2"
                                defaultChecked={typePet === "Gato"}
                                required
                            /> Gato
                        </label>
                        <label htmlFor="tipo-mascota-perro">
                            <input
                                onChange={() => handleTypePetChange('Perro')}
                                id="tipo-mascota-perro"
                                type="radio"
                                name="group2"
                                defaultChecked={typePet === "Perro"}
                                required
                            /> Perro
                        </label>
                    </div>
                    <div className="imput-checkbox">
                        <h4><span>Discapacidad</span></h4>
                        <label htmlFor="discapacidad-si">
                            <input
                                onChange={() => handleDisabilityPetChange(true)}
                                id="discapacidad-si"
                                type="radio"
                                name="group3"
                                defaultChecked={disabilityPet !== null && disabilityPet}
                                required
                            /> Si
                        </label>
                        <label htmlFor="discapacidad-no">
                            <input
                                onChange={() => handleDisabilityPetChange(false)}
                                id="discapacidad-no"
                                type="radio"
                                name="group3"
                                defaultChecked={disabilityPet !== null && !disabilityPet}
                                required
                            /> No
                        </label>
                    </div>
                    <div className="imput-checkbox">
                        <h4><span>Atencion Veterinaria</span></h4>
                        <label htmlFor="atencion-veterinaria-si">
                            <input
                                onChange={() => handleVeterinaryCare(true)}
                                id="atencion-veterinaria-si"
                                type="radio"
                                name="group4"
                                defaultChecked={veterinaryCare !== null && veterinaryCare}
                                required
                            /> Si
                        </label>
                        <label htmlFor="atencion-veterinaria-no">
                            <input
                                onChange={() => handleVeterinaryCare(false)}
                                id="atencion-veterinaria-no"
                                type="radio"
                                name="group4"
                                defaultChecked={veterinaryCare !== null && !veterinaryCare}
                                required
                            /> No
                        </label>
                    </div>
                </div>
            </form>
            ) : (
                <form className='form-publishPage'>
                <input
                    accept="image/*"
                    type="file"
                    id="image-load"
                    name='image'
                    hidden
                    onChange={handleImageChance}
                    required
                />
                <div className="header-form-lost">
                    <div className="pet-photo" onClick={handleUploadImageClick}>
                        {edit && !image ? (

                            <img src={urlImage} alt='imagen mascota' />
                        ) : (

                            <>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt='imagen mascota' />
                                ) : (
                                    <>
                                        <FaCloudUploadAlt className="icon-load" />
                                        <p>Subir imagen</p>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="footer-form-lost">
                    <h3>Descripción de la mascota</h3>
                    <textarea
                        value={petInfo}
                        onChange={handlePetInfoChange}
                        className='text'
                        required >
                    </textarea>
                </div>
                </div>

                <div className="text-container-lost">
                    <div className="imput-text">
                        <label htmlFor="nombre-mascota"> Nombre Mascota</label>
                        <input
                            value={petName}
                            onChange={handleNombreChange}
                            id="nombre-mascota"
                            type="text"
                            required
                        />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="numero-contacto"> Numero de Contacto</label>
                        <input
                            value={contactNumber}
                            onChange={handleNumberContactChange}
                            id="numero-contacto"
                            type="number"
                            className='imput-number'
                            required />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="provincia">Provicia</label>
                        <Select
                            id="provincia"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsProvincias}
                            value={ {value : province, label: province} }
                            required
                            onChange={handlePronvincia}
                            placeholder="Seleccionar provincia ..."
                            isSearchable
                        />
                    </div>
                    <div className="imput-text">
                        <label htmlFor="localidad">Localidad</label>
                        <Select
                            id='localidad'
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsLocalidad}
                            value={ {value : location, label: location} }
                            required
                            onChange={handleLocalidad}
                            placeholder="Seleccionar localidad ..."
                            isSearchable
                        />
                    </div>
                    <div className="imput-checkbox">
                        <h4><span>Tipo Mascota</span></h4>
                        <label htmlFor="tipo-mascota-gato">
                            <input
                                onChange={() => handleTypePetChange('Gato')}
                                id="tipo-mascota-gato"
                                type="radio"
                                name="group2"
                                defaultChecked={typePet === "Gato"}
                                required
                            /> Gato
                        </label>
                        <label htmlFor="tipo-mascota-perro">
                            <input
                                onChange={() => handleTypePetChange('Perro')}
                                id="tipo-mascota-perro"
                                type="radio"
                                name="group2"
                                defaultChecked={typePet === "Perro"}
                                required
                            /> Perro
                        </label>
                    </div>
                </div>
                
                
            </form>
            )}
            {edit ? (
                <div className='buttons-formPet'>
                    <button
                        onClick={onClose}
                        className='btn-publish'> Volver
                    </button>
                    <button
                        type="submit"
                        onClick={handleUpdatePet}
                        className='btn-publish'> Guardar
                    </button>
                </div>
            ) :
                <button
                    type="submit"
                    onClick={handleSubmitPet}
                    className='btn-publish'> Publicar
                </button>
            }
        </div>
    )
}
