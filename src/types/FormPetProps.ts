import { Pet } from "./Pet";

export interface FormPetsProps{
    edit : boolean
    onClose?: () => void | undefined;
    pet?: Pet | null;

}