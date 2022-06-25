import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [values, setValues] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState({});

    useEffect(() => {
        setValues({...values, name: currentUser.name,
            about: currentUser.about});
    }, [currentUser]);

    useEffect(() => {
        setValues({...values, name: currentUser.name,
            about: currentUser.about});
            setIsValid(false);
            setValidationMessage({});
    }, [props.isOpen])
    
    function handleChange(event) {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
        setIsValid(event.target.closest('form').checkValidity());
        setValidationMessage({...validationMessage, [name]: event.target.validationMessage});
    }

    function clean(event) {
        const inputName = event.target.name;
        setValues({...values, [inputName]: ""});
    }

    function onBlur(event) {
        const inputName = event.target.name;
        if (!values[inputName]) {
            setValues({...values, [inputName]: currentUser[inputName]});
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
          name: values.name,
          about: values.about
        });
      } 
      
    return (
        <PopupWithForm name="edit-profile" 
        isValid={isValid}
        title="Редактировать профиль" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit}
        submitStatus={props.submitStatus} >
            <input className="popup__item" 
            onChange={handleChange}
            onClick={clean}
            onBlur={onBlur}
            value={values.name}
            minLength="2" 
            maxLength="40" 
            id="name" 
            name="name" 
            type="text" 
            placeholder={values.name} 
            required />
            <span className={`popup__item-error name-error ${!isValid && "popup__item-error_visible"}`}>{validationMessage.name}</span>
            <input className="popup__item" 
            onChange={handleChange} 
            onClick={clean}
            onBlur={onBlur}
            value={values.about}
            minLength="2" 
            maxLength="200" 
            id="info" 
            name="about" 
            type="text" 
            placeholder={values.about} 
            required />
            <span className={`popup__item-error info-error ${!isValid && "popup__item-error_visible"}`}>{validationMessage.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;