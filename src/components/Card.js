import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {
    const сurrentUser = React.useContext(CurrentUserContext);
    const handleClick = () => {
        props.onCardClick(props.card)
    }
    const isOwn = props.card.owner._id === сurrentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? 'grid__delete-item' : 'grid__delete-item_hidden'}`
    ); 
    const isLiked = props.card.likes.some(i => i._id === сurrentUser._id);
    const cardLikeButtonClassName = `grid__heart ${isLiked ? 'grid__heart_active' : ''}`; 
    const handleLikeClick = () => {
        props.onCardLike(props.card)
    }
    const handleDeleteCard = () => {
        props.onCardDelete(props.card);
    }

    return (
        <li key={props.card._id} className="grid__item">
            <div className="grid__photo" onClick={handleClick} 
            style={{
                backgroundImage: `url(${props.card.link})`
            }} />
            <div className="grid__signature">
                <h2 className="grid__text">{props.card.name}</h2>
                <div className="grid__like">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} />
                    <span className="grid__likes-number">{props.card.likes.length}</span>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteCard} />
        </li>
    )
}

export default Card;