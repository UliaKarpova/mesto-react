import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef(null);

    React.useEffect(() => {
        avatarRef.current = currentUser.avatar;
    }, [currentUser]); 


    function handleAvatarChange(event) {
        avatarRef.current = event.target.value;
    }


    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current
        });
        
    }

    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__item" id="avatar-link" name="link" type="url" onChange={handleAvatarChange} placeholder='https://somewebsite.com/someimage.jpg' required />
            <span className="popup__item-error avatar-link-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;