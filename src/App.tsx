import { SideBarMenu } from './components/SideBar/SideBarMenu';
import { SideBarMenuCard} from './types/SideBarMenu';
import ProfileImage from './images/cv.jpg';
import { SideBarItems } from "./utils/utils";

function App() {
  
  /*Esta data vendria del backend */
  const card : SideBarMenuCard= {
    id : "1" ,
    displayName: "Juan Cruz Sanchez" ,
    title : "Programador",
    photoUrl : ProfileImage,
    url : "/"
  }

  return (
   <SideBarMenu items={SideBarItems} card={card} />
  )
}

export default App
