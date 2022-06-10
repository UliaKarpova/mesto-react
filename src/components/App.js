import React from 'react';
import {useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';


function App() {
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onCardClick={setSelectedCard} onAddPlace={handleAddPlaceClick} />
        <Footer />
       
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input className="popup__item" minLength="2" maxLength="40" id="name" name="name" type="text" placeholder="Имя" required />
            <span className="popup__item-error name-error" />
            <input className="popup__item" minLength="2" maxLength="200" id="info" name="about" type="text" placeholder="Занятие" required />
            <span className="popup__item-error info-error" />
        </PopupWithForm>
    
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input className="popup__item" id="avatar-link" name="link" type="url"  placeholder="https://somewebsite.com/someimage.jpg" required />
            <span className="popup__item-error avatar-link-error" />
        </PopupWithForm>
    
        <PopupWithForm name="add-image" title="Новое место" submit="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input className="popup__item" minLength="2" maxLength="20" id="image-name" name="name" type="text" placeholder="Название" required />
            <span className="popup__item-error image-name-error" />
            <input className="popup__item" id="image-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__item-error image-link-error" />
        </PopupWithForm>
    
        <PopupWithForm name="delete-image" title="Вы уверены?" submit="Да" onClose={closeAllPopups}>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
