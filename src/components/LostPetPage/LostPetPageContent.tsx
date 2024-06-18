import { ChangeEvent, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"
import { LuDog } from "react-icons/lu";
import { TbCat } from "react-icons/tb";
import './Styles/LostPetPageContent.scss'
import { Pagination } from "../AdoptPage/Pagination";
import { Pet } from "../../types/Pet";
import PetCard from "../AdoptPage/PetCard";
import Select from "react-select";
import axios, { AxiosResponse } from "axios";
import PopUp from "../PopUp/PopUp";


export default function LostPetPageContent() {
    const [image, setImage] = useState<File | null>(null);
    const [petName, setPetName] = useState("")
    const [petDescription, setPetDescription] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [provincePost, setProvincePost] = useState<{ value: string } | null>(null);
    const [locationPost, setLocationPost] = useState<{ value: string } | null>(null);

    const [provinceSearch, setProvinceSearch] = useState<{ value: string } | null>(null);
    const [locationSearch, setLocationSearch] = useState<{ value: string } | null>(null);
    const [petType, setPetType] = useState("")

    const [lostPets, setLostPets] = useState<Pet[]>([]);
    const [optionsProvincias, setOptionsProvincia] = useState([])
    const [optionsLocalidad, setOptionsLocalidad] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    //Mostrar popUp, indicar mensaje y menu del select
    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")

    const [route, setRoute] = useState("getLostPets");
    const [isActive, setIsActive] = useState(true);


    const handleLostPetPublish = () => {
        setRoute("getLostPets");
        setIsActive(true);
    };

    const handleMyLostPets = () => {
        setRoute("getUserLostPets");
        setIsActive(false);
    };


    const handlePetType = (type: string) => {
        if (type == petType) {
            setPetType("")
        } else if (type !== petType) {
            setPetType(type)
        }
    }

    //Handle tipo mascota change
    const handleTypePetChange = (tipo: string) => {
        setPetType(tipo)
    }

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    };

    // Función para validar que solo se ingresen letras
    const isValidInput = (inputValue: string): boolean => /^[a-zA-Z\s]*$/.test(inputValue);

    //Handle change nombre 
    const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value
        if (isValidInput(imputValue)) {
            setPetName(event.target.value)
        }
    }

    //Handle informacion mascota change
    const handlePetInfoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPetDescription(event.target.value)
    }


    //Handle change numero de contacto
    const handleNumberContactChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value)
    }

    //Handle para cargar imagen
    const handleUploadImageClick = () => {
        document.getElementById("image-load")?.click()
    }

    //handle para cambiar imagen 
    const handleImageChance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }

    const handleProvinciaPost = (option: any) => {
        if (option !== null) {
            setProvincePost(option);
            setLocationPost(null);
            obtenerLocalidad(option.value);
        } else {
            setProvincePost(null);
            setLocationPost(null);
            setOptionsLocalidad([]);
        }
    }


    const handleLocalidadPost = (option: any) => {
        setLocationPost(option);
    }


    const handleProvinciaSearch = (option: any) => {
        if (option !== null) {
            setProvinceSearch(option);
            setLocationSearch(null);
            obtenerLocalidad(option.value);
        } else {
            setProvinceSearch(null);
            setLocationSearch(null);
            setOptionsLocalidad([]);
        }
    }


    const handleLocalidadSearch = (option: any) => {
        setLocationSearch(option);
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


    const validatePublish = () => {
        return (!petName || !contactNumber || !provincePost || !location || !petDescription || !image);
    }


    //Handle submit pet
    const handleSubmitPet = async () => {
        if (validatePublish()) {
            handlePopUp("Todos los campos son obligatorios.Por favor, completar la información.");
        } else {
            handlePopUp("Desea publicar la mascota perdida?")
        }
    }


    const publishLostPet = async () => {

        const apiUrl = `${import.meta.env.VITE_BASE_URL}/lostPets/publishLostPet`

        if (image != null) {
            try {

                const formData = new FormData()

                formData.append('pet_photo', (new File([image], image.name)));
                formData.append("pet_name", petName)
                formData.append("pet_type",petType)
                formData.append("contact_number", contactNumber)
                formData.append("pet_location", locationPost ? locationPost.value : "")
                formData.append("pet_province", provincePost ? provincePost.value : "")
                formData.append("pet_description", petDescription)

                const response = await axios.post(apiUrl, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },

                })
                if (response.status === 200) {
                    handlePopUp(response.data.message);
                }
            } catch (e: any) {
                handlePopUp(e.response.data.message);
            }
        }
    }


    useEffect(() => {
        async function getLostPets() {

            try {
                const apiUrl = `${import.meta.env.VITE_BASE_URL}/lostPets/${route}`;
                const response = await axios.get(apiUrl, {
                    withCredentials: true,
                    params: {
                        page: currentPage,
                        pet_type: petType,
                        province: provinceSearch?.value,
                        location: locationSearch?.value
                    }
                });

                const { lostPets, totalPaginas } = response.data;
                setLostPets(lostPets);
                setTotalPage(totalPaginas)
            } catch (error) {
                console.error('Error al obtener mascotas:', error);
            }

        }
        getLostPets();
    }, [route,currentPage, petType, provinceSearch, locationSearch]);

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
        <div className="lostPet-container">
            {showPopUp && (
                <PopUp message={popUpMessage}  onClose={handlePopupClose} onResponse={publishLostPet} />
            )}
            <div className="lostPet-introduction">
                <h1>Mascotas perdidas</h1>
                <p>
                    La sección de mascotas perdidas es un espacio dedicado a ayudar a las personas a encontrar a sus mascotas perdidas o a reunir a mascotas encontradas con sus dueños.
                    Aquí, la gente puede publicar información sobre mascotas que han perdido o encontrado en la calle, incluyendo detalles como la descripción del animal, su ubicación
                    aproximada, cualquier característica especial, así como información de contacto para que puedan ser contactados por aquellos que puedan tener información sobre la
                    mascota perdida.
                </p>
            </div>
            <h1 className="lostPet-title">Publicacion mascota perdida</h1>
            <div className="formLostPet-container">
                <form className='form-lostPet'>
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
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt='imagen mascota' />
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="icon-load" />
                                    <p>Subir imagen</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="lostPet-textContainer">
                        <div className="grid-container">
                            <div className="gridContent-container">
                                <div className="imput-text">
                                    <label htmlFor="nombre-mascota">Nombre</label>
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
                                        required
                                        value={provincePost}
                                        onChange={handleProvinciaPost}
                                        placeholder="Seleccionar provincia..."
                                        isSearchable
                                        isClearable
                                    />
                                </div>

                                <div className="imput-text">
                                    <label htmlFor="localidad">Localidad</label>
                                    <Select
                                        id="localidad"
                                        styles={customStyles}
                                        maxMenuHeight={130}
                                        options={optionsLocalidad}
                                        required
                                        value={locationPost}
                                        onChange={handleLocalidadPost}
                                        placeholder="Seleccionar localidad..."
                                        isSearchable
                                        isClearable
                                    />
                                </div>
                                <div className="imput-check">
                                    <h4><span>Tipo Mascota</span></h4>
                                    <label htmlFor="tipo-mascota-gato">
                                        <input
                                            onChange={() => handleTypePetChange('Gato')}
                                            id="tipo-mascota-gato"
                                            type="radio"
                                            name="group1"
                                            defaultChecked={petType === "Gato"}
                                            required
                                        /> Gato
                                    </label>
                                    <label htmlFor="tipo-mascota-perro">
                                        <input
                                            onChange={() => handleTypePetChange('Perro')}
                                            id="tipo-mascota-perro"
                                            type="radio"
                                            name="group1"
                                            defaultChecked={petType === "Perro"}
                                            required
                                        /> Perro
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="footer-form">
                            <h3>Descripción</h3>
                            <textarea
                                value={petDescription}
                                onChange={handlePetInfoChange}
                                className='text'
                                required >
                            </textarea>
                        </div>
                    </div>
                </form>
                <div className="button-lostPet">
                    <button
                        type="submit"
                        onClick={handleSubmitPet}
                        className='btn-publish'> Publicar
                    </button>
                </div>
            </div>
            <div className='lostPet-searchContainer'>
                <h1 className="publish-lostPet">Mascotas en busqueda de su hogar</h1>
                <div className='search-bar'>
                    <div className='container-buttons'>
                        <div className={`button-search ${petType === "Perro" ? 'selected' : ''}`} onClick={() => handlePetType('Perro')}>
                            <LuDog className="icon-search" />
                            <p>Perro</p>
                        </div>
                        <div className={`button-search ${petType === "Gato" ? 'selected' : ''}`} onClick={() => handlePetType('Gato')}>
                            <TbCat className="icon-search" />
                            <p>Gato</p>
                        </div>
                    </div>
                    <div className='container-select'>
                        <Select
                            id="provincia-search"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsProvincias}
                            required
                            value={provinceSearch}
                            onChange={handleProvinciaSearch}
                            placeholder="Seleccionar provincia..."
                            isSearchable
                            isClearable
                        />
                        <Select
                            id="localidad-search"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsLocalidad}
                            required
                            value={locationSearch}
                            onChange={handleLocalidadSearch}
                            placeholder="Seleccionar localidad..."
                            isSearchable
                            isClearable
                        />
                    </div>
                </div>
            </div>
            <div className="toggle-container">
                <div className='container-btn'>
                    <button className={`toggle-btn ${isActive ? 'active-lost' : ''}`} onClick={handleLostPetPublish}>Mascotas perdidas</button>
                    <button className={`toggle-btn ${isActive ? '' : 'active-lost'}`} onClick={handleMyLostPets}>Mis mascotas perdidas</button>
                </div>
            </div>
            <div className='pet-container'>
                {lostPets.map((pet) => (
                    <PetCard key={pet.pet_id} pet={pet} petType="lost" myPetsAdopt={route === "getLostPets" ? true : false} />
                ))}
            </div>
            <Pagination handlePageClick={handlePageClick} totalPage={totalPage} />
        </div>

    )
}
