

import { Route, Routes } from 'react-router-dom';
import ContentIndex from './components/IndexPage/ContentIndexPage';
import Footer from './components/IndexPage/Footer';
import Header from './components/IndexPage/Header';

import { SideBarMenuCard } from './types/SideBarMenu';
import { IndexPage } from './components/IndexPage/IndexPage';


<Routes>
      <Route path='/logIn' element={<h1>Hola</h1>} />
      <Route path='/datos-personales' element={<h1>Hola</h1>} />
      <Route path='/patitas-publicadas' element={<h1>Hola</h1>} />
      <Route path='/patitas-favoritas' element={<h1>Hola</h1>} />
      <Route path='/logIn' element={<h1>Hola</h1>} />
    </Routes>


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<IndexPage/>} />
      <Route path='/logIn' element={<h1>ola</h1>} />
      <Route path='/datos-personales' element={<h1>datos</h1>} />
      <Route path='/patitas-publicadas' element={<h1>publicada</h1>} />
      <Route path='/patitas-favoritas' element={<h1>favorita</h1>} />
      <Route path='/adoptar-patita' element={<h1>adoptar</h1>} />
      <Route path='/publicar-patita' element={<h1>Publicar</h1>} />
    </Routes>
   
   </>
  )
}

export default App
