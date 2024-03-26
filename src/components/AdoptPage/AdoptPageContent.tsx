import './Styles/AdoptPage.scss'
import { LuDog } from "react-icons/lu";
import { TbCat } from "react-icons/tb";
import { IoMdFemale } from "react-icons/io";
import { TbGenderDemiboy } from "react-icons/tb";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import edadMascota from '../../utils/edadMascota.json';
import { Pagination } from './Pagination';
import PetCard from './PetCard';
import axios, { AxiosResponse } from 'axios';
import { Pet } from '../../types/Pet';


const AdoptPageContent = () => {
    const [petAge, setPetAge] = useState("")
    const [province, setProvince] = useState("")
    const [optionsProvincias, setOptionsProvincia] = useState([])
    const [location, setLocation] = useState("")
    const [optionsLocalidad, setOptionsLocalidad] = useState([])
    const [pets, setPets] = useState<Pet[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0)
    

    
    const handlePageClick = (data : any) => {
        setCurrentPage(data.selected + 1);
      };

    const handlePetAge = (option: any) => {
        setPetAge(option.value);
    }


    //Handle edad mascota change
    const handlePronvincia = (option: any) => {
        setProvince(option.value);
        obtenerLocalidad(option.value)
    }

    //Handle edad mascota change
    const handleLocalidad = (option: any) => {
        setLocation(option.value);
    }


    useEffect(() => {
        const obtenerProvincias = () => {
            axios.get("https://apis.datos.gob.ar/georef/api/provincias")
                .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                        return res.data.provincias;
                    } else {
                        return Promise.reject(res);
                    }
                })
                .then(provincias => {
                    const opcionesProvincias = provincias.map((provincia: any) => ({
                        value: provincia.nombre,
                        label: provincia.nombre
                    }));
                    setOptionsProvincia(opcionesProvincias)
                })
                .catch(error => {
                    console.log(error)
                });
        };

        obtenerProvincias();
    }, []);


    const obtenerLocalidad = (provincia: string) => {
        
        const cantidadLocalidades = 900;

        
        axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=${cantidadLocalidades}`)
            .then((res) => {
                if (res.status === 200) {

                    const opcionesMunicipio = res.data.municipios.map((municipio: any) => ({
                        value: municipio.id,
                        label: municipio.nombre
                    }));
                    setOptionsLocalidad(opcionesMunicipio);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch(error => {
                console.error('Error al obtener localidades:', error);
            });

    }


    // Estilos para el componente Select 
    const customStyles = {
        control: (styles: any) => ({
            ...styles,
            borderRadius: "15px",
            border: "1px solid #E05D5D",
            backgroundColor: "#FFF8E5",
            fontSize: "17px",
            outline: "none",
            width: "255px",
            height: "41px",
            fontFamily: 'Barlow, sans-serif',
            letterSpacing: "0.5px",
            padding: "0px 5px",
            boxShadow: "none",
            cursor: "pointer",
            color: "#225b77",


            '&:hover': {
                borderColor: "#E05D5D",
            },
        }),
        input: (style: any) => ({
            ...style,

            color: "#225b77"
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: "#225b77"
        }),
        option: (styles: any, { isSelected }: { isSelected: boolean }) => ({
            ...styles,
            backgroundColor: isSelected ? '#FFF8E5' : null,
            fontSize: "18px",
            fontFamily: 'Barlow, sans-serif',
            color: isSelected ? "#225b77" : null,
            padding: "7px 0px",
            paddingLeft: "20px",
            cursor: "pointer",
            fontWeight: "600",

            '&:hover': {
                backgroundColor: "#fdd79d"
            },
        }),
        menuList: (style: any) => ({
            ...style,
            padding: '0',
            color: "#225b77"
        }),
        menu: (styles: any) => ({
            ...styles,
            backgroundColor: "#FFF8E5",
            border: "1px solid #E05D5D",
            borderRadius: 0,
            className: 'react-select-menu',
        }),
        indicatorSeparator: (style: any) => ({
            ...style,
            backgroundColor: '#E05D5D',
        }),
        dropdownIndicator: (style: any, { isFocused }: { isFocused: boolean }) => ({
            ...style,
            color: isFocused ? '#E05D5D' : '#E05D5D',
            transition: 'color 0.2s',

            '&:hover': {
                color: isFocused ? '#E05D5D' : '#E05D5D',
            },
        }),
    };

    useEffect(() => {
        async function obtenerMascotas() {
          try {
            const apiUrl = `${import.meta.env.VITE_BASE_URL}/getPets`;
            const response = await axios.get(`${apiUrl}?page=${currentPage}`);
            
            // Extraer los datos de la respuesta

            const { mascotas, totalPaginas } = response.data;
            setPets(mascotas);
            setTotalPage(totalPaginas)
          } catch (error) {
            console.error('Error al obtener mascotas:', error);
          }
        }
        obtenerMascotas();
      }, [currentPage]);
    
    

return (
        <div className='container-adoptPage' >
            <div className='background'></div>
            <div className='container-introduction'>
                <div className='introduction-adoptPage'>
                    <h1>Adoptar</h1>
                    <p>
                        ¡Bienvenido a nuestra sección de 'Adopta una Patita'! Aquí, te brindamos la oportunidad de encontrar un compañero peludo para tu hogar.
                    </p>
                    <p>
                        Adoptar una mascota es mucho más que simplemente agregar un nuevo miembro a tu familia. Es un compromiso de por vida para cuidar, amar y proteger a tu nuevo amigo peludo.
                        Al darle un hogar a un animal necesitado, estás proporcionándole una segunda oportunidad y un futuro lleno de cariño y seguridad.
                    </p>
                    <p>
                        Al adoptar, te comprometes a ser un
                        cuidador responsable y a brindarle a tu mascota todo lo que necesita para vivir una vida feliz y saludable.
                        ¡Gracias por considerar la adopción y por ser parte de esta increíble comunidad de amantes de los animales!
                    </p>
                </div>
            </div>
            <h1 className='search-title'>Conoce a las mascotas en adopción</h1>
            <div className='search-container'>
                <div className='search-bar'>
                    <div className='container-buttons'>
                        <div className="button-search" >
                            <LuDog className="icon-search" />
                            <p>Perro</p>
                        </div>
                        <div className='button-search'>
                            <TbCat className="icon-search" />
                            <p>Gato</p>
                        </div>
                        <div className='button-search'>
                            <TbGenderDemiboy className="icon-search" />
                            <p>Macho</p>
                        </div>
                        <div className='button-search'>
                            <IoMdFemale className="icon-search" />
                            <p>Hembra</p>
                        </div>
                    </div>
                    <div className='container-select'>
                        <Select
                            id="edad-mascota"
                            styles={customStyles}
                            maxMenuHeight={130}

                            options={edadMascota}
                            required
                            onChange={handlePetAge}
                            placeholder="Seleccionar edad..."
                            isSearchable
                        />
                        <Select
                            id="provincia"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsProvincias}
                            
                            required
                            onChange={handlePronvincia}
                            placeholder="Seleccionar provincia..."
                            isSearchable
                        />
                        <Select
                            id="localidad"
                            styles={customStyles}
                            maxMenuHeight={130}
                            options={optionsLocalidad}
                            required
                            onChange={handleLocalidad}
                            placeholder="Seleccionar localidad..."
                            isSearchable
                        />
                    </div>
                </div>
            </div>
            <div className='pet-container'>
            {pets.map((pet, index) => (
                <PetCard key={index} {...pet} />
             ))}
            </div>
            <Pagination handlePageClick={handlePageClick} totalPage={totalPage}/>
        </div>
    )
}


export default AdoptPageContent