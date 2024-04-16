import './Styles/MenuPet.scss'
import { MenuPetProps } from "../../types/MenuPetProps";
import { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";

const MenuPet = ({ onClose,pet}: MenuPetProps) => {

    const [mainImage, setMainImage] = useState(pet.pet_photo);

    const handleImageClick = (src: any) => {
        setMainImage(src);
    };


    const handleWhatsappClick = () =>{
        const phoneNumber = pet.contact_number
        const message = `Hola 👋. Vi tu publicacion en Patitas sin Hogar y estoy interesado en adoptar a ${pet.pet_name} ${pet.pet_type === "Gato" ? "🐱" : "🐶"}`

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className="overlay-pet">
            <div className="menu-pet">
                <div className='img-container'>
                    <img className="img-menuPet" src={mainImage} alt="imagen-mascota" />
                    {/*}
                    <div className='more-img'>
                        <h3>Mas Fotos</h3>
                        <img className='image-secondary' src="src/images/gato.jpg" alt="" onClick={() => handleImageClick("src/images/gato.jpg")} />
                        <img className='image-secondary' src="src/images/gato2.jpg" alt="" onClick={() => handleImageClick("src/images/gato2.jpg")} />
                        <img className='image-secondary' src="src/images/perro.jpg" alt=""onClick={() => handleImageClick("src/images/perro.jpg")}/>
                        <img className='image-secondary' src="src/images/perro2.jpg" alt="" onClick={() => handleImageClick("src/images/perro2.jpg")}/>
                    </div>
                    */}
                </div>

                <div className="info-container">
                    <h1>{pet.pet_name}</h1>
                    <div className="data-container">
                        <div className="data">
                            <h3>Genero:</h3>
                            <p>{pet.pet_gender}</p>
                        </div>
                        <div className="data">
                            <h3>Tipo:</h3>
                            <p>{pet.pet_type}</p>
                        </div>
                        <div className='data'>
                            <h3>Raza:</h3>
                            <p>{pet.pet_race}</p>
                        </div>
                        <div className='data'>
                            <h3>Edad:</h3>
                            <p>{pet.pet_age}</p>
                        </div>
                        <div className='data'>
                            <h3>Provincia:</h3>
                            <p>{pet.pet_province}</p>
                        </div>
                        <div className='data'>
                            <h3>Localidad:</h3>
                            <p>{pet.pet_location}</p>
                        </div>
                        <div className="data">
                            <h3>Atencion Veterinaria:</h3>
                            <p>{pet.veterinary_care ? "Si" : "No"}</p>
                        </div>
                        <div className="data">
                            <h3>Discapacidad:</h3>
                            <p>{pet.pet_disability ? "Si" : "No"}</p>
                        </div>
                        <div className="data">
                            <h3>Contacto</h3>
                            <FaWhatsapp onClick={handleWhatsappClick} className="data-icon" />
                        </div>
                    </div>
                    <div className='menu-description'>
                        <h3>Descripcion</h3>
                        <p>{pet.pet_description}</p>
                    </div>
                    <div className='menu-button'>
                        <button onClick={onClose}>Volver</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPet