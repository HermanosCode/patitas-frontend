import { Route, Routes } from 'react-router-dom';
import LoginSingUp from './components/Login-SingUp/LoginSingUp';
import PublishPage from './components/PublishPage/PublishPage';
import HomePage from './components/HomePage/HomePage';
//import AdoptPage from './components/AdoptPage/AdoptPage';





function App() {
  
 

  return (
    
    <Routes>
      <Route path='/home-page' element={<HomePage/>} />
      <Route path='/' element={<LoginSingUp/>} />
      <Route path='/datos-personales' element={<h1>datos</h1>} />
      <Route path='/patitas-publicadas' element={<h1>publicada</h1>} />
      <Route path='/patitas-favoritas' element={<h1>favorita</h1>} />
      {/*<Route path='/adoptar-patita' element={<AdoptPage/>} /> */}
      <Route path='/publicar-patita' element={<PublishPage/>} />
    </Routes>
  )
} 
   
  

export default App
