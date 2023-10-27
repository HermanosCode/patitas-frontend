import { IconType } from "react-icons";


export interface SideBarMenuItem {
    id : string ;
    label : string;
    icon: IconType ;
    url : string ;
}

export interface SideBarMenuCard {
    id : string ;
    displayName : string;
    photoUrl : string;
    title: string ;
    url : string ;
}

export interface SideBarMenuProps{
    items: SideBarMenuItem[];
    card : SideBarMenuCard;
}

export interface SideSideBarMenuCardViewProps {
    card: SideBarMenuCard;
    isOpen: boolean;
}

export interface SideBarItemCardViewProps {
    item: SideBarMenuItem,
    isOpen: boolean
}