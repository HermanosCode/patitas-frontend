import { Pet } from "./Pet";


export interface MenuPetProps {
    onClose: () => void;
    pet : Pet
    petType? : string
    
}