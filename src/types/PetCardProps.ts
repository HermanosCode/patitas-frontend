import { Pet } from "./Pet";

export interface PetCardProps {
    pet: Pet;
    petType? : string
    myPetsAdopt? : boolean
    isFavorite?: boolean
}
