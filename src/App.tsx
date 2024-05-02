import { Route, Routes } from 'react-router-dom';
import LoginSingUp from './components/Login-SingUp/LoginSingUp';
import PublishPage from './components/PublishPage/PublishPage';
import HomePage from './components/HomePage/HomePage';
import AdoptPage from './components/AdoptPage/AdoptPage';
import MyPetsPublishPage from './components/MyPetsPublish/MyPetsPublishPage';
import MyFavoritesPetsPage from './components/MyFavoritesPets/MyFavoritesPetsPage';
import PersonalDataPage from './components/PersonalData/PersonalDataPage';









function App() {
  
 

  return (
    
    <Routes>
      <Route path='/home-page' element={<HomePage/>} />
      <Route path='/' element={<LoginSingUp/>} />
      <Route path='/datos-personales' element={ <PersonalDataPage/> } />
      <Route path='/patitas-publicadas' element={<MyPetsPublishPage/>} />
      <Route path='/patitas-favoritas' element={<MyFavoritesPetsPage/>} />
      <Route path='/adoptar-patita' element={<AdoptPage/>} /> 
      <Route path='/publicar-patita' element={<PublishPage/>} />
      <Route path='/patitas-perdidas' element={<h1>patitas perdidas</h1>} />
    </Routes>
  )
} 
   
  

export default App
