import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useEffect, useRef, useState} from 'react';

function AddPlacePopup(props) {
    const placeRef = useRef('');
    const linkRef = useRef('');

    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState({});
    
   useEffect(() => {
        placeRef.current.value = '';
        linkRef.current.value = '';
        setIsValid(false);
        setValidationMessage({});
    }, [props.isOpen])

    function validation(event) {
        const input = event.target;
        setIsValid(input.closest('form').checkValidity());
        setValidationMessage({...validationMessage, [input.name]: event.target.validationMessage});
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
        onClose={props.onClose}
        submitStatus={props.submitStatus} 
        isValid={isValid} >
            <input className="popup__item" 
            onChange={validation}
            defaultValue=''
            ref={placeRef}
            minLength="2" 
            maxLength="20" 
            id="image-name" 
            name="name" 
            type="text" 
            placeholder="Название" 
            required />
            <span className={`popup__item-error image-name-error ${!isValid && "popup__item-error_visible"}`}>{validationMessage.name}</span>
            <input className="popup__item" 
            onChange={validation}
            defaultValue=""
            ref={linkRef}
            id="image-link" 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку"
            required />
            <span className={`popup__item-error image-link-error ${!isValid && "popup__item-error_visible"}`}>{validationMessage.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;