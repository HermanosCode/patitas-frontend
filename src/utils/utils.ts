import { SideBarMenuItem } from '../types/SideBarMenu';
import { MdPets } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { BsHeartHalf } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";


/* Funcion para concatenar classNames*/
export function classNames(...args: any[]): string {
    return args.filter(Boolean).join(" ");
}

/* Opciones del SideBar*/
export const SideBarItems: SideBarMenuItem[] = [
    {
        id: "0",
        label: "Inicio",
        icon: FaHome,
        url: "/"
    },
    {
        id: "1",
        label: "Adoptar Patita",
        icon: BsHeartHalf,
        url: "/"
    },
    {
        id: "2",
        label: "Publicar Patita",
        icon: MdPets,
        url: "/"
    },
    {
        id: "3",
        label: "Contactate",
        icon: BiSupport,
        url: "/"
    },
    {
        id: "4",
        label: "Cerrar Sesion",
        icon: CiLogout,
        url: "/"
    }
];