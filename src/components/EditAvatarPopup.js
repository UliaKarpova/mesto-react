import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useRef, useEffect, useState} from "react";

function EditAvatarPopup(props) {
    const avatarRef = useRef('');

    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState("");

    useEffect(() => {
        avatarRef.current.value = "";
        setIsValid(false);
        setValidationMessage("");
    }, [props.isOpen])

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    function validation(event) {
        setIsValid(event.target.validity.valid);
        setValidationMessage(event.target.validationMessage);
    }

    return (
        <PopupWithForm name="change-avatar" 
        title="Обновить аватар" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit}
        submitStatus={props.submitStatus} 
        isValid={isValid} >
            <input className="popup__item"
            id="avatar-link" 
            name="link" 
            type="url" 
            onChange={validation}
            defaultValue=""
            ref={avatarRef} 
            placeholder="Ссылка на изображение" 
            required />
            <span className={`popup__item-error avatar-link-error ${!isValid && "popup__item-error_visible"}`}>{validationMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;