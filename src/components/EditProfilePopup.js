import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState("Имя");
    const [description, setDescription] = useState("Занятие");
    const [nameNotValid, setNameNotValid] = useState(false);
    const [nameValidationMessage, setNameValidationMessage] = useState("");
    const [descriptionNotValid, setDescriptionNotValid] = useState(false);
    const [descriptionValidationMessage, setDescriptionValidationMessage] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setNameValidationMessage("");
        setDescriptionValidationMessage("");
        setDescriptionNotValid(false);
        setNameNotValid(false);
    }, [props.isOpen])
    
    function handleNameChange(event) {
        const newName = event.target.value;
        setName(newName);
        setNameNotValid(!event.target.validity.valid);
        setNameValidationMessage(event.target.validationMessage);
    }

    function handleDescriptionChange(event) {
        const newDescription = event.target.value;
        setDescription(newDescription);
        setDescriptionNotValid(!event.target.validity.valid);
        setDescriptionValidationMessage(event.target.validationMessage);
    }

    function cleanName() {
        setName('');
    }

    function cleanDescription() {
        setDescription('');
    }
   
    function nameOnBlur() {
        if (!name) {
            setName(currentUser.name);
        }
    }

    function descriptionOnBlur() {
        if (!description) {
            setDescription(currentUser.about);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
          name,
          about: description
        });
      } 

      
    return (
        <PopupWithForm name="edit-profile" 
        title="Редактировать профиль" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit}>
            <input className="popup__item" 
            onChange={handleNameChange}
            onClick={cleanName}
            onBlur={nameOnBlur}
            value={name}
            minLength="2" 
            maxLength="40" 
            id="name" 
            name="name" 
            type="text" 
            placeholder={name}
            required />
            <span className={`popup__item-error name-error ${nameNotValid && "popup__item-error_visible"}`}>{nameValidationMessage}</span>
            <input className="popup__item" 
            onChange={handleDescriptionChange} 
            onClick={cleanDescription}
            onBlur={descriptionOnBlur}
            value={description}
            minLength="2" 
            maxLength="200" 
            id="info" 
            name="about" 
            type="text" 
            placeholder={description}
            required />
            <span className={`popup__item-error info-error ${descriptionNotValid && "popup__item-error_visible"}`}>{descriptionValidationMessage}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;