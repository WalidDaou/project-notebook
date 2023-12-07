


function addNote() {
    // Get user input
    var category = document.getElementById('category').value;
    var noteText = document.getElementById('text-note').value;
    var priority = document.querySelector('input[name="priority"]:checked').value;

    // Validate input
    if (!noteText.trim()) {
        alert('Please enter a note before adding.');
        return;
    }
    if (!category) {
        alert('Please chose category before adding.');
        return;
    }


    // Create a note card
    var notesContainer = document.getElementById('notes-container');
    var noteCard = document.createElement('div');
    noteCard.className = 'flex items-center gap-5 p-4 rounded-md bg-gray-200 relative';

    if (category === 'home') {
        noteCard.style.backgroundColor = 'red';
    } else if (category === 'hobbies') {
        noteCard.style.backgroundColor = 'blue';
    } else if (category === 'work') {
        noteCard.style.backgroundColor = 'green';
    }

    noteCard.innerHTML = `
    <div class="h-12 w-12 overflow-hidden rounded-full">
      <img src="images/R.png" alt="" />
    </div>
    <div class="overflow-hidden">
      <p>${noteText}</p>
      <p class="absolute top-3 right-4 rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer">
        <span>X</span>
      </p>
      <div class="h-8 w-8 bg-white absolute top-3 right-14 p-2 flex rounded-full cursor-pointer">
      <img src="images/pen.png" alt="" />
      </div>
      <span class="priority">${priority}</span>
      <span class="category">${category}</span>
    </div>
  `;
    notesContainer.appendChild(noteCard);

    // Add click event listener to the remove button
    noteCard.querySelector('span:first-child').addEventListener('click', function () {
        notesContainer.removeChild(noteCard);
    });

    // Clear the input fields
    document.getElementById('category').value = '';
    document.getElementById('text-note').value = '';
    
    sortNotesByPriority()
};

function sortNotesByPriority() {
    // Get the notes container
    var notesContainer = document.getElementById('notes-container');

    // Create an array to store the notes
    var notesArray = [];

    // Iterate through the child nodes of the notes container
    for (var i = 0; i < notesContainer.childNodes.length; i++) {
        // Check if the current node is an element (excluding text nodes)
        if (notesContainer.childNodes[i].nodeType === 1) {
            // Get the priority of the current note
            var priority = notesContainer.childNodes[i].querySelector('.priority').textContent;

            // Add the note and its priority to the notes array
            notesArray.push({
                note: notesContainer.childNodes[i],
                priority: parseInt(priority)
            });
        }
    }

    // Sort the notes array by priority
    notesArray.sort(function (a, b) {
        return b.priority - a.priority;
    });

    // Empty the notes container
    notesContainer.innerHTML = '';

    // Append the sorted notes to the notes container
    for (var i = 0; i < notesArray.length; i++) {
        notesContainer.appendChild(notesArray[i].note);
    }
}

document.getElementById('sort-notes').addEventListener('click', function () {
    sortNotesByPriority();
});
