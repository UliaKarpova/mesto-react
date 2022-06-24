import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useRef, useEffect, useState} from "react";

function EditAvatarPopup(props) {
    const avatarRef = useRef('');

    const [notValid, setNotValid] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");

    useEffect(() => {
        avatarRef.current.value = "";
        setValidationMessage("");
    }, [props.isOpen])

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    function validation(event) {
        setNotValid(!event.target.validity.valid);
        setValidationMessage(event.target.validationMessage);
    }

    return (
        <PopupWithForm name="change-avatar" 
        title="Обновить аватар" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit}>
            <input className="popup__item"
            id="avatar-link" 
            name="link" 
            type="url" 
            onChange={validation}
            defaultValue=""
            ref={avatarRef} 
            placeholder="Ссылка на изображение" 
            required />
            <span className={`popup__item-error avatar-link-error ${notValid && "popup__item-error_visible"}`}>{validationMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;