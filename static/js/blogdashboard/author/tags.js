const tagInput = document.querySelector('.tag-input');
const tagContainer = document.querySelector('#tag-container');

// ADDS NEW DIV TO THE TAGS CONTAINER SO THAT TAGS CAN BE 
// DISPLAYED UPDATED AND DELETED AS THEY ARE BEING TYPED
const addTag = (tag) => {
  const tagDiv = document.createElement('div');
  tagDiv.classList.add('tag');
  tagDiv.innerHTML = `
    <span>${tag}</span>
    <div class="tag-delete">x</div>
  `;
  tagContainer.appendChild(tagDiv);

};

// Listen for existing tags on page load
// THEN SPLITS THEM AND UPDATE THEM TO THE TAGS CONTAINER
// TO BE USED LATER WHEN SAVING THE UPDATES
window.addEventListener('load', () => {
    const existingTags =  tagInput.value.split(/[, ]+/);
    existingTags.forEach(tag => {
      if (tag.trim()) { // check if tag is not empty
        addTag(tag.trim());
      }
    });
    tagInput.value = '';
    
});

// -- listens to activities in the tags INPUT, WHEN THE SET KEYS ARE PRESSED
// -- IT CHECK THE TAGS AVAILABLE, CHECKS FOR COMMAS AND SPACES THEN SPLITS THEM 
// -- ACCORDINGLY
tagInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
      event.preventDefault();
      const tags = tagInput.value.split(/[, ]+/); // split by comma or space
      tags.forEach((tag) => {
        if (tag.trim()) { // check if tag is not empty
          addTag(tag.trim());
        }
      });
      tagInput.value = '';
    }
});
  
// -- FOR REMOVING TAGS WHEN YOU CLICK THE X
tagContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('tag-delete')) {
    event.target.parentElement.remove();
  }
});

//-- THIS ONE LISTENS FOR EVENTS ON UPDATE AND SAVE BUTTONS
//--ONCE THEY ARE CLICKED, IT RETRIVES THE TAGS 
//--IN FROM THE TAGS CONTAINER THE JOINS THEM  INTO A STRING, 
//--AND SEPARARTES THEM USING A COMMA, SENDS THE DATA TO THE TAGS INPUT
//--FOR DJANGO TO RETRIVE THEM.
const tagUpdate = document.querySelector('#save-button');
tagUpdate.addEventListener('click', () => {
  // Get all tags from tag container
  const tagContainer = document.querySelector('#tag-container');
  const tagSpans = tagContainer.querySelectorAll('.tag span');
  const tags = Array.from(tagSpans).map(tagSpan => tagSpan.textContent);
  // Update tag input value with comma-separated tags
  const tagInput = document.querySelector('.tag-input');
  tagInput.value = tags.join(',');
});
