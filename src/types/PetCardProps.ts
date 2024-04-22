import { Pet } from "./Pet";

export interface PetCardProps {
    pet: Pet;
    myPets : boolean;
    myPetsAdopt? : boolean
    isFavorite?: boolean
}
