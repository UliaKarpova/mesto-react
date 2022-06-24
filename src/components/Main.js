import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const userName = currentUser.name;
    const userDescription = currentUser.about;
    const userAvatar = currentUser.avatar;
        
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" 
                style={{
                    backgroundImage: `url(${userAvatar})`
                }} />
                <button type="button" 
                className="profile__edit-avatar" 
                onClick={props.onEditAvatar} />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" 
                    className="profile__edit-button" 
                    onClick={props.onEditProfile} />
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button type="button" 
                className="profile__add-button" 
                onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                <ul className="grid">
                {props.cards.map((card) => {
                    return (
                        <Card key={card._id} 
                        card={card} 
                        onImageDeleteClick={props.onImageDeleteClick}
                        onCardLike={props.onCardLike} 
                        onCardDelete={props.onCardDelete} 
                        onCardClick={props.onCardClick} />
                    )
                })}
            </ul>
            </section>
        </main>
    )
}

export default Main;