import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState("Имя");
    const [description, setDescription] = useState("Занятие");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 
    
    function handleNameChange(event) {
        const newName = event.target.value;
        setName(newName);
    }

    function handleDescriptionChange(event) {
        const newDescription = event.target.value;
        setDescription(newDescription);
    }

    
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description
        });
      } 
    

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__item" onChange={handleNameChange} minLength="2" maxLength="40" id="name" name="name" type="text" placeholder={name} required />
            <span className="popup__item-error name-error" />
            <input className="popup__item" onChange={handleDescriptionChange} minLength="2" maxLength="200" id="info" name="about" type="text" placeholder={description} required />
            <span className="popup__item-error info-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;