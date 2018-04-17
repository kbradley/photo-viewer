// Personal Objectives:
// * Use ES6
// * Make JS code as simple and clear as possible

const photosUrl = 'https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&text=dogs&api_key=e422fa8254715345e057d34a408f2a7d&safe_search=1&extras=url_s,url_m&nojsoncallback=1';

// Get photo data:
fetch(photosUrl)
.then(response => response.json())
.then(data => displayPhotoGrid(data))
.catch(error => console.log('There was an error: ' + error))
;

// Display photo grid:
function displayPhotoGrid(data) {
    const photosUl = document.getElementById('photo-grid');
    let listItem = '';
    let photoIndex = 0;

    data.photos.photo.forEach(function (photo) {
        photoObject.photos.push(photo);

        listItem += `
      <li>
        <a href="${photo.url_m}" data-index="${photoIndex}" onclick="modal.display(this); return false;">
          <img src="${photo.url_s}" alt="${photo.title}">
        </a>
      </li>
    `;

        photoIndex++;
    });

    photosUl.innerHTML += listItem;
}

// Modal Object ------------------
const modal = {
    // Properties:
    modal: document.getElementById('modal-container'),
    modalTitle: document.getElementById('modal-title'),
    modalPhoto: document.getElementById('modal-photo'),
    modalButton: document.getElementById('modal-button'),

    // Methods:
    show: function () {
        this.modal.classList.add("is-open");
    },

    hide: function () {
        this.modal.classList.remove("is-open");
    },

    display: function (elem) {
        // Get Index:
        const elemIndex = elem.getAttribute('data-index');
        const photo = photoObject.getPhotoByIndex(elemIndex);

        // Get Photo Url & Title:
        const thisPhotoUrl = photo.url_m;
        const thisTitle = photo.title;

        // Insert Modal Title:
        this.modalTitle.innerHTML = thisTitle;

        // Insert Modal Body Photo:
        this.modalPhoto.innerHTML = `
      <img src="${thisPhotoUrl}" alt="">
    `;

        // Display Modal:
        this.show();
    },

    previousPhoto: function () {
        let photo = photoObject.getPrevious();

        // Insert Modal Title:
        this.modalTitle.innerHTML = photo.title;

        // Insert Modal Body Photo:
        this.modalPhoto.innerHTML = `
      <img src="${photo.url_m}" alt="">
    `;
    },

    nextPhoto: function () {
        let photo = photoObject.getNext();

        // Insert Modal Title:
        this.modalTitle.innerHTML = photo.title;

        // Insert Modal Body Photo:
        // (note: alt value is empty since it would be redundant with title)
        this.modalPhoto.innerHTML = `
      <img src="${photo.url_m}" alt="">
    `;
    }
};

// Photo Navigation -----------------------
const photoObject = {
    // Properties:
    photos: [],
    index: 0,

    // Methods:
    getPhotoByIndex: function (index) {
        this.index = index;
        return this.photos[index];
    },

    getPrevious: function () {
        this.index--;

        if (this.index < 0) {
            this.index = this.photos.length - 1;
        }

        return this.getPhotoByIndex(this.index);
    },

    getNext: function () {
        this.index++;

        if (this.index > this.photos.length - 1) {
            this.index = 0;
        }

        return this.getPhotoByIndex(this.index);
    }
};
