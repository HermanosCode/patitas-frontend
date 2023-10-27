import { SideBarItemCardViewProps } from "../../types/SideBarMenu"
import { classNames } from "../../utils/utils"
import './styles/SideBarMenuItemView.scss';




export default function SideBarMenuItemView({ item, isOpen }: SideBarItemCardViewProps) {
    return(
    <div className="SideBarMenuItemView">
        <a href={item.url} > 
            <div className={classNames('ItemContent', isOpen ? '' : 'collapsed')}>
                <div className="icon">
                    <item.icon size="32" />
                </div>
                <span className="label">{item.label}</span>
            </div>
            
            </a>
        {
        !isOpen ? <div className="tooltip">{item.label} </div> : ""
        }
    </div>);
}