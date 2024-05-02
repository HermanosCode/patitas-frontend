
import './Styles/PersonalData.scss'
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PersonalDataContent() {
    const [image, setImage] = useState<File | null>(null);
    const [optionsProvincias, setOptionsProvincia] = useState([]);
    const [province, setProvince] = useState("");

    const handleUploadImageClick = () => {
        document.getElementById("image-load")?.click()
    }

    const handleImageChance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }

    useEffect(() => {
        const obtenerProvincias = async () => {
            try {
                const res = await axios.get("https://apis.datos.gob.ar/georef/api/provincias");
                if (res.status === 200) {
                    const provincias = res.data.provincias.map((provincia: any) => ({
                        value: provincia.nombre,
                        label: provincia.nombre
                    }));
                    setOptionsProvincia(provincias);
                }
            } catch (error) {
                console.error("Error al obtener las provincias:", error);
            }
        };

        obtenerProvincias();
    }, []);

    const handlePronvincia = (option: any) => {
        setProvince(option.value);
    }


    // Estilos para el componente Select 
    const customStyles = {
        control: (styles: any) => ({
            ...styles,
            borderRadius: "5px",
            border: "1px solid #E05D5D",
            backgroundColor: "#FFF8E5",
            marginTop: "11px",
            fontSize: "17px",
            outline: "none",
            width: "260px",
            height: "41px",
            fontFamily: 'Barlow, sans-serif',
            letterSpacing: "0.5px",
            padding: "0px 5px",
            boxShadow: "none",
            cursor: "pointer",
            color: "#225b77",
            fontWeight: "200",

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
            color: "#225b77",
            width: "100%",
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

            '&:hover': {
                backgroundColor: "#fdd79d"
            },
        }),
        menuList: (style: any) => ({
            ...style,
            padding: '0'
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

    return (
        <div className="personalData-container">
            <div className="personalData-introduction">
                <h1>Datos Personales</h1>
                <p> La sección de datos personales es el espacio donde puedes ingresar información esencial sobre ti mismo para mantener los datos de  tu cuenta. Aquí, puedes proporcionar detalles como tu nombre, correo electrónico y una foto de perfil</p>
            </div>
            <div className='user-formContainer'>
                <form action="" className='user-form'>
                    <div className="user-headerForm">
                        <input
                            accept="image/*"
                            type="file"
                            id="image-load"
                            name='image'
                            hidden
                            onChange={handleImageChance}
                            required
                        />
                        <div className="user-formPhoto" onClick={handleUploadImageClick}>
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt='imagen mascota' />
                            ) : (
                                <FaCloudUploadAlt className="icon-load" />
                            )}
                        </div>
                    </div>
                    <div className="text-container">
                        <div className="imput-text">
                            <label htmlFor="nombre-usuario"> Nombre</label>
                            <input
                                id="nombre-usuario"
                                type="text"
                                required
                            />
                        </div>
                        <div className="imput-text">
                            <label htmlFor="email-usuario"> Email</label>
                            <input
                                id="email-usuario"
                                type="email"
                                required
                            />
                        </div>

                        <div className="imput-text">
                            <label htmlFor="numero-contacto"> Numero de Contacto</label>
                            <input
                                id="numero-contacto"
                                type="number"
                                className='imput-number'
                                required />
                        </div>
                        <div className="imput-text">
                            <label htmlFor="provincia">Provincia</label>
                            <Select
                                styles={customStyles}
                                id="provincia"
                                maxMenuHeight={130}
                                value={{ value: province, label: province }}
                                options={optionsProvincias}
                                onChange={handlePronvincia}
                                placeholder="Seleccionar provincia ..."
                                isSearchable
                            />
                        </div>
                    </div>
                </form>
                <button
                    type="submit"
                    className='btn-publish'> Guardar
                </button>
            </div>
        </div>
    )
}
