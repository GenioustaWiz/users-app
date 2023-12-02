 //-----for the category EDIT BUTTON---------------------/////
 var editLinkS = document.querySelector('.edit-S'); 
 var editLinkC = document.querySelector('.edit-C'); 
 ///--------------------------------///////////////////////////
 
 

 //----This help exchange of data from select to dropdown and
 //---- from dropdown back to Select options
 // Initialisation for Article category Select
//  const statusDivC = document.querySelector(".article-w-category")
//  const showOptionsButtonC = statusDivC.querySelector(".btn");
//  const dropdownMenuC = statusDivC.querySelector(".dropdown-menu");
 const selectElementC = document.getElementById("articleCategory");
 const selectOptionsC = selectElementC.querySelectorAll("option");
//  const optionsDivC = document.getElementById("bs-select-1");
//  const optionsListC = optionsDivC.querySelector("ul");
//  const searchBoxC = dropdownMenuC.querySelector(".bs-searchbox input");
//  var filterOptionC = statusDivC.querySelector('.filter-option-inner-inner'); //help replace text inthe button
 
 // Initialisation for Article Subcategory Select
 const statusDivSc = document.querySelector(".article-w-subcate")
 const showOptionsButtonSc = statusDivSc.querySelector(".btn");
 const dropdownMenuSc = statusDivSc.querySelector(".dropdown-menu");
 const selectElementSc = document.getElementById("articleSubcategory"); //found at select
 const selectOptionsSc = selectElementSc.querySelectorAll("option");//found at select
 const optionsDivSc = document.getElementById("bs-select-1-1");
 const optionsListSc = optionsDivSc.querySelector("ul");
 const searchBoxSc = dropdownMenuSc.querySelector(".bs-searchbox input");
 var filterOptionSc = statusDivSc.querySelector('.filter-option-inner-inner'); //help replace text inthe button
 
 // Initialisation for Article Status Select
 const statusDivS = document.querySelector(".article-w-status")
 const showOptionsButtonS = statusDivS.querySelector(".btn");
 const dropdownMenu = statusDivS.querySelector(".dropdown-menu");
 const selectElementS = document.getElementById("articleStatus");
 const selectOptionsS = selectElementS.querySelectorAll("option");
 const optionsDivS = document.getElementById("bs-select-2");
 const optionsListS = optionsDivS.querySelector("ul");
 const searchBoxS = dropdownMenu.querySelector(".bs-searchbox input");
 var filterOptionS = statusDivS.querySelector('.filter-option-inner-inner'); //help replace text inthe button
 
 let isDropdownVisible = false;
 //...................CODE FOR ARTICLE CATEGORY SELECT.........//
 // Disable all the options in the select element
//  for (var i = 0; i < selectElementC.options.length; i++) {
//   selectElementC.options[i].disabled = true;
// }

//----------------------Disable and enable category selected options---------------------/////
const saveButton = document.querySelector("#save-button");
// disable all category options when page loads
const disableCategoryOptions = () => {
  const selectOptionsC = selectElementC.querySelectorAll("option");
  for (var i = 0; i < selectOptionsC.length; i++) {
    selectOptionsC[i].disabled = true;
  }
};

// enable all category options when save button is clicked
// is very important to reenable the options so that django can be able to 
// collect data of the selected category
saveButton.addEventListener("click", () => {
  const selectOptionsC = selectElementC.querySelectorAll("option");
  for (var i = 0; i < selectOptionsC.length; i++) {
    selectOptionsC[i].disabled = false;
  }
});
// ------------------------END----------------------------/////
 // populate dropdown menu with select options
//  selectOptionsC.forEach((option) => {
//    if (option.textContent.trim() !== "") {
//      const li = document.createElement("li");
//      const a = document.createElement("a");
//      a.setAttribute("href", "#");
//      a.setAttribute("data-option", option.value);
//      a.textContent = option.textContent;
//      li.appendChild(a);
//      optionsListC.appendChild(li);
//    }
//  });
 
//  // search for options as user types in search box
//  searchBoxC.addEventListener("input", () => {
//    const searchText = searchBoxC.value.toLowerCase();
//    optionsListC.querySelectorAll("li a").forEach((option) => {
//      const optionText = option.textContent.toLowerCase();
//      if (optionText.includes(searchText)) {
//        option.style.display = "";
//      } else {
//        option.style.display = "none";
//      }
//    });
//  });
 
//  // update select element with chosen option
//  optionsListC.addEventListener("click", (event) => {
//    if (event.target.tagName === "A") {
//      const selectedOptionC = selectElementC.querySelector(`option[value="${event.target.dataset.option}"]`);
//      filterOptionC.textContent = '';
//      filterOptionC.textContent = selectedOptionC.textContent;//replaces the text in the button with the selected content from the dropdown
//      selectedOptionC.selected = true;
//      dropdownMenuC.style.display = "none"; 
//      isDropdownVisible = false;
//      showOptionsButtonC.focus();
      
//      event.preventDefault(); //this helps stop the page from scrolling up when a status is selected
     
//    }
//  });
 
//  showOptionsButtonC.addEventListener("click", () => {
//    if (isDropdownVisible) {
//      dropdownMenuC.style.display = "none";
//      isDropdownVisible = false;
//    } else {
//      dropdownMenuC.style.display = "block";
//      //dropdownMenu.style.top = `${showOptionsButton.offsetTop - dropdownMenu.offsetHeight}px`;
//     // dropdownMenu.style.left = `${showOptionsButton.offsetLeft}px`;
//      isDropdownVisible = true;
//    }
//  });
 
//  document.addEventListener("click", (event) => {
//    if (!showOptionsButtonC.contains(event.target) && !dropdownMenuC.contains(event.target)) {
//      dropdownMenuC.style.display = "none";
//      isDropdownVisible = false;
//    }
//  });
 // .............END CODE FOR CATEGORY SELECT............//
 
 //...................CODE FOR ARTICLE SUBCATEGORY SELECT.........//
 // Listen for selected element on page load
//  then Updates to the subcategory Button so that the editor can see the current 
// selected Option when in the page updating section, incase they wanna change it they just click the button
//  and a new selected element will be updated 

  // -----[[[[[END OF CATEGORY DISABLED --- CODE]]]]]
let  subcategoryId;
let  categoryId;
// --UPDATES THE subcategory button with the loaded data from the blog when editing function is activated
window.addEventListener('load', () => {
  const defaultSelectedOptionSc = selectElementSc.querySelector('option[selected]');
  // Get the initially selected option value
  // then use the data to open poup windows for editing th category or subcategory selected
   categoryId = selectElementC.value;
   subcategoryId = selectElementSc.value;
  //  -----------------   ------------------
  if (defaultSelectedOptionSc) {
    // this one updates the dropdown button of the subcategories with the default selected objectPosition: 
    // when BLOG loads for editing
    filterOptionSc.textContent = '';
    filterOptionSc.textContent = defaultSelectedOptionSc.textContent;
  } 
});

 // populate dropdown menu with select options
 selectOptionsSc.forEach((option) => {
   if (option.textContent.trim() !== "") {
     const li = document.createElement("li");
     const a = document.createElement("a");
     a.setAttribute("href", "#");
     a.setAttribute("data-option", option.value);
     a.textContent = option.textContent;
     li.appendChild(a);
     optionsListSc.appendChild(li);
   }
 });
 
 // search for options as user types in search box
 searchBoxSc.addEventListener("input", () => {
   const searchText = searchBoxSc.value.toLowerCase();
   optionsListSc.querySelectorAll("li a").forEach((option) => {
     const optionText = option.textContent.toLowerCase();
     if (optionText.includes(searchText)) {
       option.style.display = "";
     } else {
       option.style.display = "none";
     }
   });
 }); 
 
 // update select element with chosen option
 optionsListSc.addEventListener("click", (event) => {
   if (event.target.tagName === "A") {
     const selectedOptionSc = selectElementSc.querySelector(`option[value="${event.target.dataset.option}"]`);
     subcategoryId = selectedOptionSc.value;
     filterOptionSc.textContent = '';
     filterOptionSc.textContent = selectedOptionSc.textContent;//replaces the text in the button with the selected content from the dropdown
     selectedOptionSc.selected = true;
     console.log(subcategoryId);
    //  for updating category with a relevante category holding the selected subcategory
    // the python code for fetching the data is found in  Dashboard_article_v.py file on line no:128
     fetch(`/get_category_by_subcategory/${subcategoryId}/`)
     .then(response => response.json())
     .then(data => {
      //Returns the slug of the category mother of the selected Subcategory
       categoryId = data.category_id;
       selectElementC.value = categoryId;

     })
     .catch(error => console.log(error));
    // --------End-------//

     dropdownMenuSc.style.display = "none"; 
     isDropdownVisible = false;
     showOptionsButtonSc.focus();
      
     event.preventDefault(); //this helps stop the page from scrolling up when a status is selected
     
   }
 });
 
 showOptionsButtonSc.addEventListener("click", () => {
   if (isDropdownVisible) {
     dropdownMenuSc.style.display = "none";
     isDropdownVisible = false;
   } else {
     dropdownMenuSc.style.display = "block";
     //dropdownMenu.style.top = `${showOptionsButton.offsetTop - dropdownMenu.offsetHeight}px`;
    // dropdownMenu.style.left = `${showOptionsButton.offsetLeft}px`;
     isDropdownVisible = true;
   }
 });
 
 document.addEventListener("click", (event) => {
   if (!showOptionsButtonSc.contains(event.target) && !dropdownMenuSc.contains(event.target)) {
     dropdownMenuSc.style.display = "none";
     isDropdownVisible = false;
   }
 });
 // .............END CODE FOR SUBCATEGORY SELECT............//
 
//  Actively listens to  subcategory and category edit buttons,  
// opens popup window when the data is true an button has been clicked
 //----------------Category Edit POPUP WINDOW ------
 editLinkS.addEventListener('click', function(e) {
      e.preventDefault();
      if (subcategoryId){
      window.open("/subcategory/edit/" + subcategoryId + "/", 'popupWindow', 'width=600,height=400');
    } else { // go back to blog_create Page if subcategory ID is not found
      editLinkS.href = "{% url 'blog:blog_create' %}";
    }
});
editLinkC.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(categoryId);
      if (categoryId){
      window.open("/category/edit/" + categoryId + "/", 'popupWindow', 'width=600,height=400');
    } else { // go back to blog_create Page
      editLinkC.href = "{% url 'blog:blog_create' %}";
    }
});
///----------------end of edit button------------///


 //...................CODE FOR ARTICLE STATUS SELECT.........//
 // populate dropdown menu with select options
 selectOptionsS.forEach((option) => {
   if (option.textContent.trim() !== "") {
     const li = document.createElement("li");
     const a = document.createElement("a");
     a.setAttribute("href", "#");
     a.setAttribute("data-option", option.value);
     a.textContent = option.textContent;
     li.appendChild(a);
     optionsListS.appendChild(li);
   }
 });
 
 
 // search for options as user types in search box
 searchBoxS.addEventListener("input", () => {
   const searchText = searchBoxS.value.toLowerCase();
   optionsListS.querySelectorAll("li a").forEach((option) => {
     const optionText = option.textContent.toLowerCase();
     if (optionText.includes(searchText)) {
       option.style.display = "";
     } else {
       option.style.display = "none";
     }
   });
 });
 
 // update select element with chosen option
 optionsListS.addEventListener("click", (event) => {
   if (event.target.tagName === "A") {
     const selectedOptionS = selectElementS.querySelector(`option[value="${event.target.dataset.option}"]`);
     filterOptionS.textContent = '';
     filterOptionS.textContent = selectedOptionS.textContent;//replaces the text in the button with the selected content from the dropdown
     selectedOptionS.selected = true;
     dropdownMenu.style.display = "none"; 
     isDropdownVisible = false;
     showOptionsButtonS.focus();
     
     event.preventDefault(); //this helps stop the page from scrolling up when a status is selected
     
   }
 });
 
 showOptionsButtonS.addEventListener("click", () => {
   if (isDropdownVisible) {
     dropdownMenu.style.display = "none";
     isDropdownVisible = false;
   } else {
     dropdownMenu.style.display = "block";
     //dropdownMenu.style.top = `${showOptionsButton.offsetTop - dropdownMenu.offsetHeight}px`;
    // dropdownMenu.style.left = `${showOptionsButton.offsetLeft}px`;
     isDropdownVisible = true;
   }
 });
 
 document.addEventListener("click", (event) => {
   if (!showOptionsButtonS.contains(event.target) && !dropdownMenu.contains(event.target)) {
     dropdownMenu.style.display = "none";
     isDropdownVisible = false;
   }
 });
 // .............END CODE FOR STATUS SELECT............//
 //dropdown.addEventListener("click", function() {
  // dropdown.classList.toggle("dropup");
 //});