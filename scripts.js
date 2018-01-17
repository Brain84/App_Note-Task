var divEl;
var pointX;
var pointY;

var newNoteForm = document.querySelector("#top form");

//on DOM load
document.addEventListener("DOMContentLoaded", function() {
  createNotes();
});

function createNotes() {
  newNoteForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var titleNote = this.querySelector(".form-new-note").value;
    addNewNote(titleNote);
  });
};

//Add new note to the body
function addNewNote(titleNote) {
  var divEl = document.createElement("div");
  var barEl = document.createElement("div");
  var spanEl = document.createElement("span");
  var inputEl = document.createElement("input");
  var textareaEl = document.createElement("textarea");

  divEl.classList.add("sticker");
  barEl.classList.add("bar");
  spanEl.classList.add("close-note");
  spanEl.title = "Close note";
  inputEl.classList.add("name-note");
  inputEl.placeholder = "Note name";
  textareaEl.classList.add("form-textarea");
  textareaEl.placeholder = "Your note";

  divEl.appendChild(barEl);
  barEl.appendChild(spanEl);
  divEl.appendChild(inputEl);
  divEl.appendChild(textareaEl);
  document.body.appendChild(divEl);

  inputEl.value = titleNote;

  var transformValue = "translateX(" + Math.random() * 200 + "px) translateY(" + Math.random() * 400 + "px)";
  divEl.style.transform = transformValue;
  
  var deleteNoteButton = divEl.querySelector(".close-note");
  
  deleteNoteButton.addEventListener("click", function() {
    deleteNote(this);
  });

  divEl.addEventListener("mousedown", draggStart, false);
};

//Delete new note
function deleteNote(note) {
  var divEl = note.closest(".sticker");
  note.closest("body").removeChild(divEl);
}

//Dragging element
function draggStart(e) {
  var boundingClientRect;
  if(e.target.className.indexOf("bar") === -1) {
    return;
  }
  divEl = this;
  boundingClientRect = divEl.getBoundingClientRect();

  pointX = boundingClientRect.left - e.clientX;
  pointY = boundingClientRect.top - e.clientY;
};

function dragged(e) {
  if (!divEl) {
    return;
  }
    var posX = e.clientX + pointX;
    var posY = e.clientY + pointY;

    if (posX < 0) {
      posX = 0;
    }
    if (posY < 0) {
      posY = 0;
    }

  divEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
};

function draggEnd() {
  divEl = null;
  pointX = null;
  pointY = null;
};

document.addEventListener("mousemove", dragged, false);
document.addEventListener("mouseup", draggEnd, false);