const hideButton = document.querySelector('#hide-button');
const sideBar = document.querySelector('#side-bar');
const bodyContainer = document.querySelector('.body-container');
const main = document.querySelector('#main');

hideButton.addEventListener('click', function() {
  if (sideBar.classList.contains('hidden')) {
    // unhide sidebar
    sideBar.classList.remove('hidden');
    main.classList.remove('expanded');
    bodyContainer.classList.remove('body-container--hide');
    
    // bodyContainer.classList.add('body-container');
    hideButton.querySelector('.indicator').textContent = '❮❮';
  } else {
    // hide sidebar
    sideBar.classList.add('hidden');
    main.classList.add('expanded');
    // bodyContainer.classList.remove('body-container--unhide');
    bodyContainer.classList.add('body-container--hide');
    
    hideButton.querySelector('.indicator').textContent = '❯❯';
  }
});

window.addEventListener('load', () => {
  hideButton.querySelector('.indicator').textContent = '❮❮';
});