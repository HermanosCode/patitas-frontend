
import './Style/PublishPageContent.scss'
import FormPet from './FormPet';





const PublishPageContent = () => {


    return (
        <div className="container-publishPage">
            
            <div className='introductionPublish-container'>
                <div className='introduction-publishPage'>
                    <h1>Publicar </h1>
                    <p>
                        Bienvenido a nuestra sección de 'Publicar Patita'. En este espacio, te brindamos la oportunidad de encontrar un nuevo hogar amoroso para tu mascota.
                        Comparte la historia y las fotos de tu amigo peludo con nuestra comunidad, y juntos ayudaremos a encontrarle el hogar perfecto
                    </p>
                    <p>
                        Al publicar aquí, estás dando el primer paso para asegurar un futuro brillante y lleno de cariño para tu mascota.
                        ¡Únete a nosotros en este acto de generosidad y compasión!
                    </p>
                </div>
                <img className="img-introduction" src="src/images/publishPage-logo.png" alt="gato y perro dibujado" />
            </div>
            <div className='explain-publishPage'>
                <h1>Publicar mascota en 3 pasos</h1>
                <div className='explain-container'>
                    <div className='part-explain'>

                        <img src="src/images/document.png" alt="formulario de datos" />

                        <h3> 1. Completar datos personales</h3>
                        <p>
                            Es necesario proporcionar tus datos personales. Si aún no has completado tus datos personales, puedes hacerlo fácilmente haciendo clic en el  siguiente enlace
                            <a className='link' href="/datos-personales">"Datos personales</a>
                        </p>

                    </div>
                    <div className='part-explain'>

                        <img src="src/images/form.png" alt="formulario" />

                        <h3>2. Completar  formulario</h3>
                        <p>
                            Cuantos más detalles proporciones en el formulario, mejor será la oportunidad de encontrarle un hogar adecuado. No dudes en contar la
                            historia de tu mascota, así como su personalidad, hábitos y cualquier detalle que pueda ser relevante para su adopción.
                        </p>
                    </div>

                    <div className='part-explain'>

                        <img src="src/images/button.png" alt="boton publicar" />

                        <h3>3. Publicar mascota</h3>
                        <p>
                            Una vez que hayas completado el formulario con los detalles de tu mascota, simplemente presiona el botón "Publicar" y
                            ¡Listo!. Tu mascota estará disponible para ser vista por posibles adoptantes en busca de un nuevo miembro para su familia.
                        </p>
                    </div>
                </div>
            </div>

            <div className='huellas'></div>
            <h3 className='title-form'>Formulario de publicación mascota</h3>
            <FormPet edit={false} pet={null} onClose={undefined}/>
        </div>
    )
}

export default PublishPageContent