
let categoryToClassesMap = {
  home: "bg-red-200",
  hobbies: "bg-green-200",
  work: "bg-yellow-200"
};




let notesContainer = document.querySelector('.notes-container');
let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

updateNotesArray(notes)
function updateUINotesContainer() {
  notesContainer.innerHTML = ''
  notes.forEach(function (noteItem) {
    let noteHTML = generatNoteHTML(noteItem);
    notesContainer.innerHTML += noteHTML;
  });
}


function generatNoteHTML(noteItem) {
  return `
  <div class="flex items-center ${categoryToClassesMap[noteItem.category]} gap-5 p-4 rounded-md bg-gray-200 relative">
       <div class="h-12 w-12 overflow-hidden rounded-full">
           <img class="avatar-image" src="${noteItem.profile}" alt="" />
       </div>
       <p>${noteItem.content}</p>
       <div class="actions top-4 right-4 flex gap-3">
         <p class="rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer">
           <span onclick="editNote('${noteItem.id}')"> edit </span>
         </p>
         <p class="rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer">
           <span onclick="deleteNote('${noteItem.id}')">X</span>
         </p>
       </div>
  </div>
  `;
 }





function deleteNote(noteID) {
  // Assuming notes is an array of note objects and noteID is the id of the note to delete
  let indexToRemove = notes.findIndex(function (note) {
    return note.id === noteID;
  });
  if (indexToRemove !== -1) {
    notes.splice(indexToRemove, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateUINotesContainer();
  }
}

window.onload = function () {
  updateUINotesContainer();
};

let textAreaInput = document.querySelector('textarea')
let textAreaInputError = document.querySelector('#text-area-error')

let categoryInput = document.querySelector('select')
let categoryInputError = document.querySelector('#category-input-error')

function addNote() {
  let contentValid = validateTextAreaInput();
  let priorityValid = validatePriorityInput();
  let categoryValid = validateCategoryInput();
  // validate user inputs
  if (contentValid && priorityValid && categoryValid) {
    let priorityInputValue = document.querySelector('input[name="priority"]:checked').value
    let newNote = {
      id: noteBeingEdited?.id ? noteBeingEdited.id : generateNoteID(),
      profile: thumb
    };
    newNote.content = textAreaInput.value
    newNote['priority'] = priorityInputValue
    newNote['category'] = categoryInput.value

    // push to notes array
    updateNotesArray([...notes, newNote]);
    populateFormInputs();
  }

}

function generateNoteID() {
  // We can use Math.random()
  return Date.now().toString();
}

function validateTextAreaInput() {
  if (!textAreaInput.value) {
    textAreaInputError.classList.remove('hidden')
    return false;
  }
  textAreaInputError.classList.add('hidden')
  return true;
}

function validatePriorityInput() {
  let priorityInputValue = document.querySelector('input[name="priority"]:checked')?.value
  let priorityInputError = document.querySelector('#priority-input-error')
  if (!priorityInputValue) {
    priorityInputError.classList.remove('hidden')
    return false;
  }
  priorityInputError.classList.add('hidden')
  return true;
}

function validateCategoryInput() {
  if (!categoryInput.value) {
    categoryInputError.classList.remove('hidden')
    return false;
  }
  categoryInputError.classList.add('hidden')
  return true;
}

let noteBeingEdited;
function editNote(noteID) {
  // get note
  noteBeingEdited = notes.find(function (note) {
    return noteID === note.id
  })
  if (!noteBeingEdited) {
    return;
  }

  // remove from notes array
  deleteNote(noteID)

  // populate in inputs
  populateFormInputs(noteBeingEdited)
}

function populateFormInputs(noteObject = {}) {
  // content
  textAreaInput.value = noteObject.content || '';
  // priority
  // document.querySelectorAll('input[type=radio]')[4].value
  document.querySelectorAll('input[name="priority"]').forEach(function (radioInput) {
    if (radioInput.value == noteObject.priority) {
      radioInput.checked = true;
    } else {
      radioInput.checked = false;
    }
  })

  // category
  categoryInput.value = noteObject.category || ''

}

function updateNotesArray(notesArray = []) {
  notes = notesArray
  localStorage.setItem('notes', JSON.stringify(notes))
  // reflect changes to UI
  // never call outside of this function
  updateUINotesContainer();
}

function sortNotesAsc() {
  let sortedNotesArray = notes.sort(function (a, b) {
    return a.priority - b.priority
  })
  updateNotesArray(sortedNotesArray)
}
function sortNotesDesc() {
  let sortedNotesArray = notes.sort(function (a, b) {
    return b.priority - a.priority
  })
  updateNotesArray(sortedNotesArray)
}

var thumb;
var globalNum = 0;

function updateAv(num, str) {
  globalNum = num;
  thumb = str;
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    images[i].className = '';
  }
  document.getElementById('thumb' + num).className = 'selected';

  // Save the avatar number in a cookie
  document.cookie = "avatar=" + num + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

function getSavedAvatar() {
  var name = "avatar=";
  var cookieArray = document.cookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

// function showLoginForm() {
//   document.getElementById('select_avatar').classlist.add('hidden');
//   document.getElementById('loginForm').classlist.remove('hidden');
// }


function showLoginForm() {
  // Check if the element with class 'cart' exists
  var card = document.querySelector('.notes-container');

  // If the element exists, then proceed
  if (card) {
    // Now you can safely use the 'style' property to set 'display'
    card.style.display = 'none';

    // Update the avatar in the noteItem
    var avatarImage = document.querySelector('.avatar-image');
    if (avatarImage) {
      avatarImage.src = 'images/avatar' + (globalNum + 1) + '.webp';
    } else {
      console.error("Element with class 'avatar-image' not found.");
    }
  } else {
    console.error("Element with class 'cart' not found.");
  }
}

// ... (rest of your code)


// function login(event) {
//   var username = document.getElementById('username').value;
//   if (username.trim() === "") {
//     alert("Please enter a username.");
//     return;
//   }

//   // Update the selected avatar and username in local storage
//   localStorage.setItem('selectedAvatar', thumb);
//   localStorage.setItem('username', username);

//   // Here, you would typically send the username and avatar information to the server for authentication.

//   // For demonstration purposes, we'll just show an alert with the selected avatar and username.
//   document.querySelector('.account').classlist.add('hidden');
//   document.querySelector('.note').classList.remove('hidden');

//   // Update notes rendering with the selected avatar
//   updateUINotesContainer();
// }

window.onload = function () {
  // Get the saved avatar number from the cookie
  var savedAvatar = getSavedAvatar();
  if (savedAvatar != "") {
    updateAv(parseInt(savedAvatar), 'images/avatar' + (parseInt(savedAvatar) + 1) + '.webp');
  }

  // Check if there is a saved username and selected avatar in local storage
  var savedUsername = localStorage.getItem('username');
  var savedAvatarFromStorage = localStorage.getItem('selectedAvatar');
  if (savedUsername && savedAvatarFromStorage) {
    // Update the UI with the saved username and avatar
    document.getElementById('username').value = savedUsername;
    updateAv(globalNum, savedAvatarFromStorage);
    showLoginForm(); // Assuming you want to show the note section after login
  }
};
