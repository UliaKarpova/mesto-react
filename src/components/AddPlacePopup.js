import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useEffect, useRef, useState} from 'react';

function AddPlacePopup(props) {
    const placeRef = useRef('');
    const linkRef = useRef('');

    const [placeNotValid, setPlaceNotValid] = useState('false');
    const [placeValidationMessage, setPlaceValidationMessage] = useState("");
    const [linkNotValid, setLinkNotValid] = useState('false');
    const [linkValidationMessage, setLinkValidationMessage] = useState("");

   
   useEffect(() => {
        placeRef.current.value = '';
        linkRef.current.value = '';
        setPlaceValidationMessage("");
        setLinkValidationMessage("");
    }, [props.isOpen])

    function placeValidation(event) {
        setPlaceNotValid(!event.target.validity.valid);
        setPlaceValidationMessage(event.target.validationMessage);
    }

    function linkValidation(event) {
        setLinkNotValid(!event.target.validity.valid);
        setLinkValidationMessage(event.target.validationMessage);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit({
            name: placeRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm name="add-image" 
        title="Новое место" 
        onSubmit={handleSubmit} 
        submit="Создать" 
        isOpen={props.isOpen} 
        onClose={props.onClose}>
            <input className="popup__item" 
            onChange={placeValidation}
            defaultValue=''
            ref={placeRef}
            minLength="2" 
            maxLength="20" 
            id="image-name" 
            name="name" 
            type="text" 
            placeholder="Название" 
            required />
            <span className={`popup__item-error image-name-error ${placeNotValid && "popup__item-error_visible"}`}>{placeValidationMessage}</span>
            
            <input className="popup__item" 
            onChange={linkValidation}
            defaultValue=""
            ref={linkRef}
            id="image-link" 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку"
            required />
            <span className={`popup__item-error image-link-error ${linkNotValid && "popup__item-error_visible"}`}>{linkValidationMessage}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;