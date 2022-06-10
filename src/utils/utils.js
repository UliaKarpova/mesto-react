export const nameInput = document.querySelector('#name');
export const infoInput = document.querySelector('#info');
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible'
}
export const editButton = document.querySelector('.profile__edit-button');
export const profileForm = document.querySelector('.popup__edit-button');
export const initialCards = [
  {
    name: 'Обское море',
    link: 'https://images.unsplash.com/photo-1595933868307-5a7083dfb921?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Горный Алтай',
    link: 'https://images.unsplash.com/photo-1577033226943-58e28a0d65d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Мыс Острый',
    link: 'https://images.unsplash.com/photo-1636363880339-dc1c020d3e8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fCVEMCVCRiVEMSU4MCVEMCVCOCVEMSU4MCVEMCVCRSVEMCVCNCVEMCVCMCUyMCVEMSU4MCVEMCVCRSVEMSU4MSVEMSU4MSVEMCVCOCVEMCVCOHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1630763741321-16e7bff61e2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Красная Поляна',
    link: 'https://images.unsplash.com/photo-1603787292746-92adce40cbef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  }
];
export const addButton = document.querySelector('.profile__add-button');
export const addForm = document.querySelector('.popup__add-button');
export const avatarChangeForm = document.querySelector('.popup__change-button');
export const avatarChangeButton = document.querySelector('.profile__edit-avatar');
export const profileAvatar = document.querySelector('.profile__avatar');
export const deleteSubmitButton = document.querySelector('.popup__submit_place_delete');
