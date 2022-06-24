import React from 'react';
import {useEffect, useState} from 'react';
import api from '../utils/Api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import AddPlacePopup from '../components/AddPlacePopup';

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImageDeletePopupOpen, setIsImageDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [deletedCard, setDeletedCard] = useState('');

    useEffect(() => {
        api.getPhotos()
        .then((photos) => {
            setCards(photos);
        }).catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        api.getInfo()
        .then((item) => {
           setCurrentUser(item);
        }).catch((err) => console.log(err));
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => console.log(err))
    }

    function handleCardDelete(event) {
        event.preventDefault();
        api.deleteImage(deletedCard).then(() => {
            setCards((cards) => cards.filter((c) => c._id === deletedCard._id ? '' : c));
            closeAllPopups();
            setDeletedCard('');
        }).catch((err) => console.log(err))
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    function handleImageDeleteClick(data) {
        setDeletedCard(data);
        setIsImageDeletePopupOpen(!isImageDeletePopupOpen);
    };

    function closeAllPopups() {
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsImageDeletePopupOpen(false);
            setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        api.sendNewProfileInfo(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        }).catch((err) => console.log(err))
    }

    function handleUpdateAvatar(data) {
        api.sendNewAvatar(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        }).catch((err) => console.log(err))
    }

    function handleAppPlaceSubmit(data) {
        api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
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
            onCardLike={handleCardLike}
            /*onCardDelete={handleCardDelete}*/ />

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} />

            <AddPlacePopup submit="Создать" 
            cards={cards}
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onSubmit={handleAppPlaceSubmit} />
        
            <PopupWithForm name="delete-image" 
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
