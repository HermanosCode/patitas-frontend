
import { ChangeEvent, useState } from 'react';
import './Style/PublishPageContent.scss'
import { FaCloudUploadAlt } from "react-icons/fa";
import PopUp from '../PopUp/PopUp';
import Select from 'react-select';
import edadMascota from '../../utils/edadMascota.json';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PublishPageContent = () => {


    //Estados de los campos de entrada
    const [image,setImage] = useState<File | null>(null);
    const [petName,setPetName] = useState("")
    const [petRace,setPetRace] = useState("")
    const [petAge,setPetAge] = useState("")
    const [contactNumber,setContactNumber] = useState("")
    const [genderPet,setGenderPet] = useState("")
    const [typePet,setTypePet] = useState("")
    const [disabilityPet,setDisabilityPet] = useState<boolean | null>(null)
    const [veterinaryCare,setVeterinaryCare] = useState<boolean | null>(null)
    const [petInfo,setPetInfo] = useState("")
    
    //Mostrar popUp, indicar mensaje y menu del select
    const [showPopUp,setShowPopUp] = useState(false)
    const [popUpMessage,setPopUpMessage] = useState("")
    
    


    // Función para validar que solo se ingresen letras
    const isValidInput = (inputValue: string): boolean => /^[a-zA-Z\s]*$/.test(inputValue);

    //Handle change nombre 
    const handleNombreChange = (event : ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value 
        if (isValidInput(imputValue)){
            setPetName(event.target.value)
        }
    }

    //Handle change raza
    const handleRaceChange =(event : ChangeEvent<HTMLInputElement>) => {
        const imputValue = event.target.value 
        if (isValidInput(imputValue)){
        setPetRace(event.target.value)
        }
    }

    //Handle change numero de contacto
    const handleNumberContactChange =(event : ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value)
    }

    //Handle informacion mascota change
    const handlePetInfoChange = (event : ChangeEvent<HTMLTextAreaElement>) => {
        setPetInfo(event.target.value)
    }

    //Handle edad mascota change
    const handlePetAge = (option: any) => {
        setPetAge(option.value);
    }
    //Handle genero mascota change
    const handleGenderPetChange = (tipo :string) => {
        setGenderPet(tipo)
    }


    //Handle tipo mascota change
    const handleTypePetChange = (tipo : string) => {
        setTypePet(tipo)
    }


    //Handle dispacadidad mascota change 
    const handleDisabilityPetChange = (option :boolean) => {
        setDisabilityPet(option)
    }

    //Handle atencion veterinaria change 
    const handleVeterinaryCare = (option : boolean) => {
        setVeterinaryCare(option)
    }


    //Handle para cargar imagen
    const handleUploadImageClick = () =>{
        document.getElementById("image-load")?.click()
      
   }
   
   //handle para imagen change 
   const handleImageChance = (e :React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setImage(file);
      }
   }

   
    

    //Handle para actualizar el popUp
    const handlePopUp = ( message : string) => {
    setPopUpMessage(message);
    setShowPopUp(true);
    }

    //Handle para cambiar el estado del popUp
    const handlePopupClose = () => {
    setShowPopUp(false);
    };


    //Funcion para validar que el formulario este completo 
    const validateForm = () => {
        return (!petName || !petRace || !petAge || !contactNumber || !genderPet || !typePet || !petInfo || !image || disabilityPet === null || !veterinaryCare === null);
    }

    //Handle para publicar mascota
    const handleSubmit = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault()
        
        if(validateForm()){
            handlePopUp("Todos los campos son obligatorios. Por favor, completar la información.")
        } else {
            
        
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/publicar`; 

            if(image){
            const formData = new FormData();
            formData.append('pet_photo',(new File([image], image.name)));
            //console.log(image)
            //console.log(image.name)
            formData.append('pet_name', petName);
            formData.append('pet_race',petRace);
            formData.append('pet_age',petAge);
            formData.append('contact_number',contactNumber);
            formData.append('pet_gender',genderPet === "Macho" ? '1' : '0');
            formData.append('pet_type',typePet === "Gato" ? '1' : '0' );
            formData.append('pet_disability',disabilityPet ? '1' : '0');
            formData.append('veterinary_care',veterinaryCare ? '1' : '0');
            formData.append('pet_description',petInfo);
            
            try{
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200){
                handlePopUp(response.data.message)
            }
            } catch(error : any){
                handlePopUp(error.response.data.message)
            }
            }
        }
    }

    


    //Handle reseteo publicacion
    const handleReset = () => {
        setPetName(""),
        setPetRace(""),
        setContactNumber(""),
        setPetInfo(""),
        setPetAge(""),
        setGenderPet(""),
        setTypePet(""),
        setDisabilityPet(null),
        setVeterinaryCare(null),
        setImage(null)
    }

  
     // Estilos para el componente Select 
      const customStyles = {
        control : (styles : any) => ({
            ...styles,
            borderRadius : "5px",
            border : "1px solid #E05D5D",
            backgroundColor : "#FFF8E5",
            marginTop : "11px",
            fontSize : "17px",
            outline: "none",
            width : "100%",
            height : "41px",
            fontFamily: 'Barlow, sans-serif',
            letterSpacing: "0.5px",
            padding : "0px 5px",
            boxShadow : "none",
            cursor : "pointer",

            '&:hover' : {
                borderColor : "#E05D5D",
            },
        }),
        input: (style: any) => ({
            ...style,
            display: 'none', 
        }),
        singleValue : (styles : any) => ({
            ...styles,
            color : "#225b77"
        }),
        option : (styles : any,{isSelected }: {isSelected: boolean }) => ({
            ...styles,
            backgroundColor: isSelected ? '#FFF8E5' : null,
            fontSize : "18px",
            fontFamily: 'Barlow, sans-serif',
            color : isSelected ? "#225b77": null,
            padding : "7px 0px",
            paddingLeft : "20px",
            cursor : "pointer",

            '&:hover' : {
                backgroundColor : "#fdd79d"   
            }, 
        }),
        menuList: (style : any) => ({ 
            ...style, 
            padding: '0' 
        }),
        menu : (styles : any) => ({
            ...styles,
            backgroundColor : "#FFF8E5",
            border : "1px solid #E05D5D",
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
        <div className="container-publishPage">
            {showPopUp && (
                <PopUp  message={popUpMessage} onClose={handlePopupClose} />
            )}
            <div className='introductionPublish-container'>
                <div className='introduction-publishPage'>
                    <h1>Publicar </h1>
                    <p>
                        Bienvenido a nuestra sección de 'Publicar Patita'. En este espacio, te brindamos la oportunidad de encontrar un nuevo hogar amoroso para tu mascota. 
                        Comparte la historia y las fotos de tu amigo peludo con nuestra comunidad, y juntos ayudaremos a encontrarle el hogar perfecto
                    </p>
                    <p>
                        Al publicar aquí, estás dando el primer paso para asegurar un futuro brillante y lleno de cariño para tu mascota. 
                        ¡Únete a nosotros en este acto de generosidad y compasión!
                    </p>
                </div>
                <img className="img-introduction" src="src/images/publishPage-logo.png" alt="gato y perro dibujado" />
            </div>
            <div className='explain-publishPage'>
                <h1>Publicar mascota en 3 pasos</h1>
                    <div className='explain-container'>
                        <div className='part-explain'>
                            
                                <img src="src/images/document.png" alt="formulario de datos" />
                            
                            <h3> 1. Completar datos personales</h3>
                            <p>
                                Es necesario proporcionar tus datos personales. Si aún no has completado tus datos personales, puedes hacerlo fácilmente haciendo clic en el  siguiente enlace
                                <a className='link' href="/datos-personales">"Datos personales</a>   
                            </p>
                           
                        </div>
                        <div className='part-explain'>
                            
                                <img src="src/images/form.png" alt="formulario" />
                            
                            <h3>2. Completar  formulario</h3>
                            <p>
                                Cuantos más detalles proporciones en el formulario, mejor será la oportunidad de encontrarle un hogar adecuado. No dudes en contar la 
                                historia de tu mascota, así como su personalidad, hábitos y cualquier detalle que pueda ser relevante para su adopción. 
                            </p>
                        </div>
                
                        <div className='part-explain'>
                            
                                <img src="src/images/button.png" alt="boton publicar" />
                          
                            <h3>3. Publicar mascota</h3>
                            <p>
                                Una vez que hayas completado el formulario con los detalles de tu mascota, simplemente presiona el botón "Publicar" y 
                                ¡Listo!. Tu mascota estará disponible para ser vista por posibles adoptantes en busca de un nuevo miembro para su familia.
                            </p>
                        </div>
                    </div>
            </div>
            
            <div className='huellas'></div>
            
            <h3 className='title-form'>Formulario Mascota</h3>
            <div className='form-container'>
                
            <form   className='form-publishPage'>
                <div className="header-form">
                    <div className="pet-photo" onClick={handleUploadImageClick}>
                        {image ? 
                            <img  src={URL.createObjectURL(image)} alt='imagen mascota'/> 
                            :
                            <>
                            <FaCloudUploadAlt className="icon-load"/>
                            <p>Subir imagen</p>
                            </>
                        }
                    </div> 
                    <input 
                            accept="image/*" 
                            type="file" 
                            id="image-load"
                            name='image'
                            hidden 
                            onChange={handleImageChance}
                            required
                    />
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
                            <label htmlFor="edad-mascota"> Edad Mascota</label>
                            <Select
                                id="edad-mascota"
                                styles={customStyles} 
                                maxMenuHeight={130}
                                options={edadMascota} 
                                required
                                onChange={handlePetAge}
                                placeholder="Seleccionar ..."
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
                                required/>
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
                                    required
                                /> Hembra
                            </label>
                            <label htmlFor="genero-mascota-macho">
                                <input 
                                    onChange={() => handleGenderPetChange('Macho')}
                                    id="genero-mascota-macho"
                                    type="radio" 
                                    name="group1"
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
                                    required
                                /> Gato
                            </label>
                            <label htmlFor="tipo-mascota-perro">
                                <input
                                    onChange={() => handleTypePetChange('Perro')}
                                    id="tipo-mascota-perro"
                                    type="radio" 
                                    name="group2"
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
                                    required
                                /> Si
                            </label>
                            <label htmlFor="discapacidad-no">
                                <input 
                                    onChange={() => handleDisabilityPetChange(false)}
                                    id="discapacidad-no"
                                    type="radio" 
                                    name="group3"
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
                                    required
                                /> Si
                            </label>
                            <label htmlFor="atencion-veterinaria-no">
                                <input 
                                    onChange={() => handleVeterinaryCare(false)}
                                    id="atencion-veterinaria-no"
                                    type="radio" 
                                    name="group4"
                                    required
                                /> No
                            </label>
                        </div>
                    </div>
            </form>
            <button 
                type="submit"  
                onClick={handleSubmit} 
                className='btn-publish'> Publicar 
            </button>
            </div>
        </div>
    )
}

export default PublishPageContent