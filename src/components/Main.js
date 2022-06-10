import React from 'react';
import api from '../utils/Api';
import Card from './Card';

import photo from "../images/Loading.png";
function Main(props) {
    const [userName, setUserName] = React.useState("Пользователь");
    const [userDescription, setUserDescription] = React.useState("О себе");
    const [userAvatar, setUserAvatar] = React.useState({photo});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInfo()
        .then((item) => {
            setUserName(item.name);
            setUserDescription(item.about);
            setUserAvatar(item.avatar);
        }).catch((err) => console.log(err));
    }, [])
     
    React.useEffect(() => {
        api.getPhotos()
        .then((item) => {
            setCards(item);
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