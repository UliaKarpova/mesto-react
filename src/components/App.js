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
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from '../components/AddPlacePopup';


function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);


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
        });
    }

    function handleCardDelete(card) {
        api.deleteImage(card).then(() => {
            setCards((cards) => cards.filter((c) => c._id === card._id ? '' : c));
        })
    }

    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    function handleEditProfileClick() {
        setisEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    function handleAddPlaceClick() {
        setisAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    function closeAllPopups() {
            setisAddPlacePopupOpen(false);
            setisEditAvatarPopupOpen(false);
            setisEditProfilePopupOpen(false);
            setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        api.sendNewProfileInfo(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        })
    }

    function handleUpdateAvatar(data) {
        api.sendNewAvatar(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        })
    }

    function handleAppPlaceSubmit(data) {
        api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
    }

   

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onCardClick={setSelectedCard} 
            onAddPlace={handleAddPlaceClick} 
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
            <Footer />
       
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            
            <AddPlacePopup submit="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAppPlaceSubmit} />
    
            
    
            
    
            <PopupWithForm name="delete-image" title="Вы уверены?" submit="Да" onClose={closeAllPopups}>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
