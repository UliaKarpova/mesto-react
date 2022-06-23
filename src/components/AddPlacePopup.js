import PopupWithForm from "./PopupWithForm";
import React from "react";
function AddPlacePopup(props) {

    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    function handlePlaceChange(event) {
        const newPlace = event.target.value;
        setPlace(newPlace);
    }

    function handleLinkChange(event) {
        const newLink = event.target.value;
        setLink(newLink);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            name: place,
            link
        });
    }

    return (
        <PopupWithForm name="add-image" title="Новое место" onSubmit={handleSubmit} submit="Создать" isOpen={props.isOpen} onClose={props.onClose}>
            <input className="popup__item" onChange={handlePlaceChange} minLength="2" maxLength="20" id="image-name" name="name" type="text" placeholder="Название" required />
            <span className="popup__item-error image-name-error" />
            <input className="popup__item" onChange={handleLinkChange} id="image-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__item-error image-link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;