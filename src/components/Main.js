import React from 'react';
import {useEffect, useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

import photo from "../images/Loading.png";
function Main(props) {
    const [userName, setUserName] = useState("Пользователь");
    const [userDescription, setUserDescription] = useState("О себе");
    const [userAvatar, setUserAvatar] = useState({photo});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([
            api.getInfo(),
            api.getPhotos()
          ])
        .then((items) => {
            const info = items[0];
            const photos = items[1];
            setUserName(info.name);
            setUserDescription(info.about);
            setUserAvatar(info.avatar);
            setCards(photos);
        }).catch((err) => console.log(err));
    }, [])
     
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" 
                style={{
                    backgroundImage: `url(${userAvatar})`
                }} />
                <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar} />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                <ul className="grid">
                {cards.map((card) => {
                    return (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                    )
                })}
            </ul>
            </section>
            
        </main>
    )
}

export default Main;