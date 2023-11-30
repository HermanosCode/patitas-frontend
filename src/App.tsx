import { SideBarMenu } from './components/SideBar/SideBarMenu';
import { SideBarMenuCard} from './types/SideBarMenu';
import ProfileImage from './images/cv.jpg';
import { SideBarItems } from "./utils/utils";
import  { Fragment, useState } from 'react';
import  PopUp  from "./components/PopUp/PopUp";
import LoginSingUp from "./components/Login-SingUp/LoginSingUp"

function App() {
  
    return (
      <>
      <PopUp message='Su mascota ha sido publicada correctamente'/>
      <LoginSingUp/>
      </>
      
      
    )
  /*
  /*Esta data vendria del backend 
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
  */
}

export default App
