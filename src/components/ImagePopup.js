import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_larger-image ${props.card && "popup_opened"}`}>
            <figure className="popup-larger__container">
            <button type="button" className="popup__exit" onClick={props.onClose} />
            <img className="popup-larger__photo" src={`${props.card?.link}`} alt={`${props.card?.name}`} />
            <figcaption className="popup-larger__caption">{`${props.card?.name}`}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;