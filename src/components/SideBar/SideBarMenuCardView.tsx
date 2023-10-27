import { SideSideBarMenuCardViewProps } from "../../types/SideBarMenu"
import { classNames } from "../../utils/utils"
import './styles/SideBarMenuCardView.scss';



export default function SideBarMenuCardView({ card, isOpen }: SideSideBarMenuCardViewProps) {

    return (
        <div className="SideBarMenuCardView">
            <img className="profile" alt={card.displayName} src={card.photoUrl} width="100%"/>
            <div className={classNames('profileInfo', isOpen ? '' : 'collapsed')}>
                <div className="name">{card.displayName} </div>
                <div className="title">{card.title} </div>
                <div className="url"><a href={card.url}>Ir al perfil</a> </div>
            </div>
        </div>
    );



}