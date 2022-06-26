import React from 'react';
import {useEffect, useState} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import ImageDeletePopup from './ImageDeletePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import api from '../utils/Api';

import '../index.css';


function App() {
    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImageDeletePopupOpen, setIsImageDeletePopupOpen] = useState(false);
    
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardGoingToBeDeleted, setCardGoingToBeDeleted] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        Promise.all([
        api.getPhotos(),
        api.getInfo()])

        .then(([cards, data]) => {
            setCards(cards);
            setCurrentUser(data);
        }).catch((err) => console.log(err));
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleImageDeleteClick(data) {
        setCardGoingToBeDeleted(data);
        setIsImageDeletePopupOpen(true);
    };

    function closeAllPopups() {
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsImageDeletePopupOpen(false);
            setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        setSubmitDisabled(true);

        api.sendNewProfileInfo(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleUpdateAvatar(data) {
        setSubmitDisabled(true);

        api.sendNewAvatar(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleAppPlaceSubmit(data) {
        setSubmitDisabled(true);

        api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
            setSubmitDisabled(false)
        }).catch((err) => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => console.log(err))
    }

    function handleCardDelete(event) {
        event.preventDefault();

        api.deleteImage(cardGoingToBeDeleted).then(() => {
            setCards((cards) => cards.filter((c) => c._id === cardGoingToBeDeleted._id ? '' : c));
            closeAllPopups();
            setCardGoingToBeDeleted({});
        }).catch((err) => console.log(err))
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />

            <Main 
            onImageDeleteClick={handleImageDeleteClick}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onCardClick={setSelectedCard} 
            onAddPlace={handleAddPlaceClick} 
            cards={cards}
            onCardLike={handleCardLike} />

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} 
            submitStatus={submitDisabled} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} 
            submitStatus={submitDisabled} />

            <AddPlacePopup submit="Создать" 
            cards={cards}
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onSubmit={handleAppPlaceSubmit}
            submitStatus={submitDisabled} />
        
            <ImageDeletePopup name="delete-image" 
            title="Вы уверены?" 
            submit="Да" 
            onSubmit={handleCardDelete}
            isOpen={isImageDeletePopupOpen} 
            onClose={closeAllPopups} />

            <ImagePopup card={selectedCard} 
            onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;