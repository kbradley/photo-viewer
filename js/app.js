// Personal Objectives:
// * Use ES6
// * Make JS code as simple and clear as possible


const photosUrl = 'https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&text=dogs&api_key=e422fa8254715345e057d34a408f2a7d&safe_search=1&extras=url_s,url_m&nojsoncallback=1';

// Get photo data:
fetch(photosUrl)
.then(response => response.json())
.then(photos => displayPhotoGrid(photos))
.catch(error => console.log('There was an error: ' + error));

// Display photo grid:
function displayPhotoGrid(photos) {
    const photosUl = document.getElementById('photo-grid');
    let listItem = '';

    photos.photos.photo.forEach(function (photo) {
        listItem += `
      <li>
        <a href="${photo.url_m}" data-title="${photo.title}" onclick="displayModal(this); return false;">
          <img src="${photo.url_s}" alt="${photo.title}">
        </a>
      </li>
    `;
    });

    photosUl.innerHTML += listItem;
}


// Modal Functions
function showModal(modal) {
    modal.classList.add("is-open");
}

function hideModal(modal) {
    modal.classList.remove("is-open");
}

function displayModal(elem) {
    // Get Photo Url:
    const thisPhotoUrl = elem.getAttribute('href');

    // Modal Title:
    const thisTitle = elem.getAttribute('data-title');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = thisTitle;

    // Modal Body Photo
    const modalBodyPhoto = document.getElementById('modal-photo');

    // photo
    modalBodyPhoto.innerHTML = `
    <img src="${thisPhotoUrl}" alt="">
  `;

    // Modal:
    const modal = document.getElementById('modal');
    showModal(modal);

    // Button:
    const modalButton = document.getElementById('modal-button');
    modalButton.onclick = function() {
        hideModal(modal);
    };
}