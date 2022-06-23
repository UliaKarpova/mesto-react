class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this.sendNewProfileInfo =  this.sendNewProfileInfo.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
        this.sendNewAvatar = this.sendNewAvatar.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    getInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    getPhotos() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    sendNewProfileInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data) 
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    addNewCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    changeLikeCardStatus(data, isLiked) {
        return fetch(`${this._url}cards/${data}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    deleteImage(data) {
        return fetch(`${this._url}cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }

    sendNewAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data) 
        }).then((res) => {
            if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
        });
    }
}

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-41/',
    headers: {
      authorization: 'd60f88da-0c33-4cb7-a701-de2dcdca59ad',
      "content-Type": "application/json",
    }
  });

export default api;