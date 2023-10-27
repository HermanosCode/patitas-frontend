import { SideBarMenuProps} from "../../types/SideBarMenu"
import {useState} from "react";
import { classNames } from "../../utils/utils";
import  {RxHamburgerMenu}  from "react-icons/rx";
import SideBarMenuCardView from "./SideBarMenuCardView";
import SideBarMenuItemView from "./SideBarMenuItemView";
import './styles/SideBarMenu.scss';



export function SideBarMenu( {items,card}: SideBarMenuProps) {
    const [isOpen,setIsOpen] = useState<boolean>(true) ;

    function handleClick(){
        setIsOpen(!isOpen);
    }

    
    return (
    <div className={classNames('SideBarMenu', isOpen ? 'expanded' : 'collapsed')}>   
        <div className="menuButton"> 
            <button className="SideBarMenuButton" onClick={handleClick}>
                <RxHamburgerMenu size="25"/>
            </button>
        </div>
        <SideBarMenuCardView card={card} isOpen={isOpen} />
        {
           items.map((item) => (
                <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen} /> 
        ))}       
    </div>
    );

}