import { useEffect, useState } from 'react'
import './Styles/MyPublishPageContent.scss'
import { Pet } from '../../types/Pet'
import PetCard from '../AdoptPage/PetCard';
import axios from 'axios';
import { MdOutlinePets } from "react-icons/md";


const MyPetsPublishPageContent = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [route, setRoute] = useState("getUserPets");
    const [isActive, setIsActive] = useState(true);

    const handlePublishPets = () => {
        setRoute("getUserPets");
        setIsActive(true);
    };

    const handleAdoptedPets = () => {
        setRoute("getAdoptedPets");
        setIsActive(false);
    };

    useEffect(() => {
        async function mascotasUsuario() {
            try {
                const apiUrl = `${import.meta.env.VITE_BASE_URL}/pet/${route}`;
                const response = await axios.get(apiUrl, {
                    withCredentials: true
                });
                const { mascotasUser } = response.data;
                setPets(mascotasUser);
            } catch (e) {
                console.error('Error al obtener mascotas:', e);
            }
        }
        mascotasUsuario();
    }, [route]);

    return (

        <div className="myPetsPublish-container">
            {route === "getUserPets" ? (
                <div className='myPets-info'>
                    <h1 className='myPets-title'> Mascotas publicadas</h1>
                    <p className='myPets-text'>En la sección de "Mascotas Publicadas", encontrarás todas tus mascotas publicadas en la página. Esta sección está diseñada para que
                        puedas gestionar fácilmente la información de tus mascotas.
                    </p>
                    <ul className='list-container'>
                        <div className='list-text-container'>
                            <MdOutlinePets className='icon-info' />
                            <p className='list-text'>Accede a todos los detalles de la mascota publicada.</p>
                        </div>
                        <div className='list-text-container'>
                            <MdOutlinePets className='icon-info' />
                            <p className='list-text'>Modifica la información de la mascota publicada, como su descripción o agregar nuevas fotos.</p>
                        </div>
                        <div className='list-text-container'>
                            <MdOutlinePets className='icon-info' />
                            <p className='list-text'>Elimina la publicación de la mascota, retirándola de la lista de mascotas disponibles para adopción.</p>
                        </div>
                        <div className='list-text-container'>
                            <MdOutlinePets className='icon-info' />
                            <p className='list-text'>Marca la mascota como adoptada, indicando que ha encontrado un nuevo hogar y ya no está disponible para adopción.
                                Al hacerlo la mascota se guardará en la sección "Mascotas adoptadas"</p>
                        </div>
                    </ul>
                </div>
            ) : (
                <div className='myPets-info'>
                    <h1 className='myPets-title'> Mascotas adoptadas</h1>
                    <p className='myPets-text'>En la  sección "Adoptar Mascotas" es donde se guardan las mascotas a las que les has conseguido un hogar,
                        actúa como un registro histórico, permitiéndote  consultar la informacion de la mascota y llevar un seguimiento de todas las adopciones que has facilitado.
                    </p>
                </div>
            )}

            <div className="toggle-container">
                <div className='container-btn'>
                    <button className={`toggle-btn ${isActive ? 'active' : ''}`} onClick={handlePublishPets}>Mascotas publicadas</button>
                    <button className={`toggle-btn ${isActive ? '' : 'active'}`} onClick={handleAdoptedPets}>Mascotas adoptadas</button>
                </div>
            </div>
            <div className='myPetsPublish-pets'>
                {pets.map((pet) => (
                    <PetCard key={pet.pet_id} pet={pet} myPets={true} myPetsAdopt={route === "getUserPets" ? false : true}/>
                ))}
            </div>
        </div>
    );
};


export default MyPetsPublishPageContent