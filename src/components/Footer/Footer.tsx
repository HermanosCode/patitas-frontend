import './Style/Footer.scss'


const Footer = () => {
    return (
        <>
            <footer className="footer-container">
                <img className="logo-footer" src="src/images/logoFooter.png" alt="logo-paginaWeb" />
                <div className='text-footer'>
                    <a href="/home-page">INICIO</a>
                    <a href="/publicar-patita">PUBLICAR </a>
                    <a href="/adoptar-patita">ADOPTAR </a>
                    <a href="/datos-personales">CONTACTO</a>
                </div>
                <div className='company-text'>
                    <img src="src/images/logoCompaniaF.png" alt="logo-empresa" />
                    <p>Diseño y programacion</p>
                    <a href="https://www.linkedin.com/company/hermanoscode/about/">
                        <button>CONTACTO</button>
                    </a>
                </div>
            </footer>
            <div className='hermanosCode'>
                <p>@ Hermanos Code</p>
            </div>
        </>
    )
}

export default Footer