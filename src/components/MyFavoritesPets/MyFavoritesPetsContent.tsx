import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "../AdoptPage/PetCard";
import { Pet } from "../../types/Pet";
import './Styles/MyFavoritesPets.scss'


export default function MyFavoritesPetsContent() {

    const [favoritesPets, setFavoritesPets] = useState<Pet[]>([]);


    useEffect(() => {
        async function getFavoritesDataPets() {
            try {
                const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/getFavoritesDataPets`;
                const response = await axios.get(apiUrl, { withCredentials: true });
                const favoritesPets = response.data.favoritesPetsData;
                setFavoritesPets(favoritesPets);
            } catch (error) {
                console.error("Error al obtener mascotas favoritas", error);
            }
        }
        getFavoritesDataPets();
    }, []);




    return (
        <div className="favoritePets-container">
            <div className="favoritePets-introduccion">
                <h1>Mis patitas Favoritas</h1>
                <p>
                    "¡Bienvenido a la sección 'Patitas Favoritas'! Aquí es donde podrás encontrar a todas las mascotas a las que has agregado como favoritas, brindándote la oportunidad de hacer un seguimiento detallado de aquellas
                    mascotas que te han cautivado el corazón y a quienes estás considerando para la adopción.
                </p>
            </div>
            <div className='pet-container'>
                {favoritesPets.map((pet) => (
                    <PetCard key={pet.pet_id} pet={pet} myPets={false} myPetsAdopt={false} isFavorite={favoritesPets.some(favoritePetId => favoritePetId.pet_id === pet.pet_id)} />
                ))}
            </div>
        </div >

    )
}
