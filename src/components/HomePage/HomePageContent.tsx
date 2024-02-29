import { Link } from 'react-router-dom'
import './Style/HomePage.scss'

const HomePageContent = () => {
    return(
        <div className="homePage-container">
            <div className="introduction-container">
                <div className='logo-container'>
                    <img src="src/images/logoFinal.png" alt="imagen-patitasSinHogar" />
                </div>
                <div className="introduction-text">
                    <h2>Que es PATITAS SIN HOGAR?</h2>
                    <p>
                        En <span>Patitas Sin Hogar</span>, creemos en hacer una diferencia en la vida de nuestros amigos peludos.
                        Somos una pagina dedicada a conectar a personas que desean abrir sus corazones y hogares a mascotas necesitadas. 
                    </p>
                    <p>
                        Ya sea que estés buscando adoptar un compañero fiel o estés buscando el mejor hogar posible para una mascota, aquí es donde comienza una historia 
                        de amor y compañía. Cada perfil cuenta la historia única de una patita en busca de un hogar lleno de cariño. 
                    </p>
                    <p>
                        Creemos en la magia de la adopción y en la conexión especial que se forma entre humanos y animales. Únete a nosotros en este viaje donde la compasión se 
                        encuentra con la esperanza, y juntos construimos puentes que transforman vidas.

                    </p>
                    <p>
                        ¡Bienvenido a Patitas Sin Hogar, donde cada patita cuenta y cada historia es un 
                        testimonio de amor incondicional!
                    </p>
                </div>
            </div>
            <div className="userData-container">
                <h2> Datos personales</h2>
                <p>
                    En Patitas Sin Hogar, nuestra prioridad es garantizar la seguridad y el bienestar de todas las mascotas y personas que forman parte de nuestra comunidad. 
                    Para facilitar un proceso de adopción y publicación de mascotas transparente y confiable, requerimos que los usuarios completen sus datos personales. 
                </p>
                <p>
                    Estos datos son manejados con la máxima confidencialidad y solo se utilizan con el propósito de facilitar la adopción responsable y la conexión 
                    entre dueños actuales y futuros cuidadores 
                </p>
                <Link to={"/datos-personales"}>
                    <button>Datos Personales</button> 
                </Link>
            </div>
            
            <div className="adoptPet-container">
                <img src="src/images/perro.jpg" alt="imagen-perro" />
                <div className="adopt-text">
                    <h2>Adoptá</h2>
                    <p>
                        Al decidir adoptar una mascota, es crucial considerar diversos factores para garantizar el bienestar tanto del animal como del adoptante. 
                    </p>
                    <p>
                        Algunos de estos factores 
                        incluyen el tiempo dedicado a la mascota, la disposición para jugar, proporcionarle una alimentación adecuada y brindarle atención médica cuando sea necesario.

                        Antes de tomar la decisión de adoptar, es esencial evaluar la propia rutina y estilo de vida para asegurarse de que se pueda ofrecer el 
                        tiempo y los cuidados necesarios. 
                    </p>
                    <p>
                        Cada mascota tiene sus propias necesidades y requerimientos, por lo que es importante elegir una que se adapte al entorno y a 
                        la capacidad del adoptante para proporcionar los cuidados adecuados.
                    </p>
                    <Link to={"/adoptar-patita"}>
                        <button> Adoptar</button>
                    </Link>
                </div>
        
            </div>
            <div className="postPet-container">
                <div className="post-text">
                    <h2>Publicá</h2>
                    <p>
                        Publicar sobre una mascota que encontraste en situación de calle o a la que no puedes darle refugio es una acción valiosa que puede cambiar la vida del animal
                        Es importante incluir detalles relevantes sobre la mascota, como su personalidad, necesidades especiales, y cualquier información médica disponible.
                    </p>
                    <p>
                        Además, proporcionar fotos claras puede generar un mayor interés y empatía por parte de posibles adoptantes.
                        Al publicar sobre la mascota, estás contribuyendo a crear conciencia sobre la importancia de la adopción y brindando la posibilidad de una vida 
                        mejor para el animal.   
                    </p>
                    <p>
                    Tu esfuerzo puede ser clave para conectar a la mascota con personas dispuestas a brindarle el amor y el cuidado que merece!.
                    </p>
                    <Link to={"/publicar-patita"}>
                        <button> Publicar </button>
                    </Link>
                </div>
                    <img src="src/images/gato.jpg" alt="imagen-gato" />
            </div>
        </div>
    )
}


export default HomePageContent